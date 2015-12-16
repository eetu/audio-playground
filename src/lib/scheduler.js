// Inspiration from https://github.com/catarak/web-audio-sequencer
export default class Scheduler {
  constructor(ac) {
    this.ac = ac;
    this.startTime;
    this.requestId;
    this.noteTime;
    this.rhythmIndex;
    this.tempo = 60;
    this.loopLength = 16;
    this.started = false;
  }

  start() {
    this.started = true;
    this.noteTime = 0.0;
    this.startTime = this.ac.currentTime + 0.005;
    this.rhythmIndex = 0;
    this.schedule();
  }

  stop() {
    this.started = false;
    cancelAnimationFrame(this.requestId);
  }

  on(id, cb) {
    this.cb = cb;
  }

  schedule() {
    var currentTime = this.ac.currentTime;

    currentTime -= this.startTime;

    while (this.noteTime < currentTime + 0.200) {
      var contextPlayTime = this.noteTime + this.startTime;
      this.cb(contextPlayTime);
      this.advanceNote();
    }

    this.requestId = requestAnimationFrame(this.schedule.bind(this), 0);
  }

  advanceNote() {
      var secondsPerBeat = 60.0 / this.tempo;

      this.rhythmIndex++;
      if (this.rhythmIndex == this.loopLength) {
          this.rhythmIndex = 0;
      }

      //0.25 because each square is a 16th note
      this.noteTime += 0.25 * secondsPerBeat;
  }
}
