import browserify from 'browserify';
import browserSync from 'browser-sync';
import duration from 'gulp-duration';
import gulp from 'gulp';
import gutil from 'gulp-util';
import jade from 'gulp-jade';
import notifier from 'node-notifier';
import path from 'path';
import prefix from 'gulp-autoprefixer';
import rev from 'gulp-rev';
import source from 'vinyl-source-stream';
import exorcist from 'exorcist';
import transform from 'vinyl-transform';
import sourcemaps from 'gulp-sourcemaps';
import streamify from 'gulp-streamify';
import stylus from 'gulp-stylus';
import uglify from 'gulp-uglify';
import watchify from 'watchify';
import watch from 'gulp-watch';
import inject from 'gulp-inject';

/*eslint "no-process-env":0 */
const production = process.env.NODE_ENV === 'production';

const config = {
  source: './src',
  destination: './public',
  scripts: {
    source: './src/main.js',
    destination: './public/js/',
    extensions: ['.jsx'],
    filename: 'bundle.js'
  },
  templates: {
    source: './src/*.jade',
    watch: './src/*.jade',
    destination: './public/',
    revision: './public/**/*.html'
  },
  styles: {
    source: './src/style.styl',
    watch: './src/**/*.styl',
    destination: './public/css/'
  },
  assets: {
    source: './src/assets/**/*.*',
    watch: './src/assets/**/*.*',
    destination: './public/'
  },
  inject: {
    resources: ['./public/**/*.css', './public/**/*.js']
  }
};

const browserifyConfig = {
  entries: [config.scripts.source],
  extensions: config.scripts.extensions,
  debug: !production,
  cache: {},
  packageCache: {}
};

function handleError(err) {
  gutil.log(err);
  gutil.beep();
  notifier.notify({
    title: 'Compile Error',
    message: err.message
  });
  return this.emit('end');
}

gulp.task('scripts', () => {
  let pipeline = browserify(browserifyConfig)
    .bundle()
    .on('error', handleError)
    .pipe(source(config.scripts.filename));

  if(production) {
    pipeline = pipeline
      .pipe(streamify(uglify()))
      .pipe(streamify(rev()));
  } else {
    pipeline = pipeline.pipe(transform(() => {
      return exorcist(path.join(config.scripts.destination, config.scripts.filename) + '.map');
    }));
  }

  return pipeline.pipe(gulp.dest(config.scripts.destination));
});

gulp.task('templates', ['styles', 'scripts'], () => {
  const resources = gulp.src(config.inject.resources, {read: false});

  const pipeline = gulp.src(config.templates.source)
  .pipe(jade({
    pretty: !production
  }))
  .on('error', handleError)
  .pipe(inject(resources, {ignorePath: 'public', removeTags: true}))
  .pipe(gulp.dest(config.templates.destination));

  if(production) {
    return pipeline;
  }

  return pipeline.pipe(browserSync.reload({
    stream: true
  }));
});

gulp.task('styles', () => {
  let pipeline = gulp.src(config.styles.source);

  if(!production) {
    pipeline = pipeline.pipe(sourcemaps.init());
  }

  pipeline = pipeline.pipe(stylus({
    'include css': true,
    paths: ['node_modules', path.join(__dirname, config.source)],
    compress: production
  }))
  .on('error', handleError)
  .pipe(prefix('last 2 versions', 'Chrome 34', 'Firefox 28', 'iOS 7'));

  if(production) {
    pipeline = pipeline.pipe(rev());
  } else {
    pipeline = pipeline.pipe(sourcemaps.write('.'));
  }

  pipeline = pipeline.pipe(gulp.dest(config.styles.destination));

  if(production) {
    return pipeline;
  }

  return pipeline.pipe(browserSync.stream({
    match: '**/*.css'
  }));
});

gulp.task('assets', () => {
  return gulp.src(config.assets.source)
    .pipe(gulp.dest(config.assets.destination));
});

gulp.task('server', () => {
  return browserSync({
    open: false,
    port: 9001,
    notify: false,
    ghostMode: false,
    server: {
      baseDir: config.destination
    }
  });
});

gulp.task('watch', () => {

  ['templates', 'styles', 'assets'].forEach((watched) => {
    watch(config[watched].watch, () => {
      gulp.start(watched);
    });
  });

  const bundle = watchify(browserify(browserifyConfig));

  bundle.on('update', () => {
    const build = bundle.bundle()
      .on('error', handleError)
      .pipe(source(config.scripts.filename));

    build
    .pipe(transform(() => {
      return exorcist(config.scripts.destination + config.scripts.filename + '.map');
    }))
    .pipe(gulp.dest(config.scripts.destination))
    .pipe(duration('Rebundling browserify bundle'))
    .pipe(browserSync.reload({stream: true}));
  }).emit('update');
});

gulp.task('build', ['styles', 'assets', 'scripts', 'templates']);
gulp.task('default', ['styles', 'assets', 'templates', 'watch', 'server']);
