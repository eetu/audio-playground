import React, {Component, PropTypes} from 'react';

const WIDTH  = 1024;
const HEIGHT = 240;

class Analyser extends Component {
  componentDidMount() {
    const {audioContext, gain} = this.props;

    // analyzer
    this.analyser = audioContext.createAnalyser();
    this.analyser.fftSize = 2048;
    this.bufferLength = this.analyser.fftSize;
    this.dataArray = new Uint8Array(this.bufferLength);
    this.analyser.getByteTimeDomainData(this.dataArray);
    this.canvas = document.getElementById('analyser-canvas');
    this.canvasContext = this.canvas.getContext('2d');

    this.draw();
  }

  draw() {
    requestAnimationFrame(this.draw.bind(this));
    this.analyser.getByteTimeDomainData(this.dataArray);

    this.canvasContext.fillStyle = 'rgb(200, 200, 200)';
    this.canvasContext.fillRect(0, 0, WIDTH, HEIGHT);

    this.canvasContext.lineWidth = 1;
    this.canvasContext.strokeStyle = 'rgb(0, 0, 0)';

    this.canvasContext.beginPath();

    const sliceWidth = WIDTH * 1.0 / this.bufferLength;
    let x = 0;

    for(let i = 0; i < this.bufferLength; i++) {

      const v = this.dataArray[i] / 128.0;
      const y = v * HEIGHT / 2;

      if(i === 0) {
        this.canvasContext.moveTo(x, y);
      } else {
        this.canvasContext.lineTo(x, y);
      }
      x += sliceWidth;
    }

    this.canvasContext.lineTo(WIDTH, HEIGHT / 2);
    this.canvasContext.stroke();
  }

  render() {
    return <canvas width={WIDTH} height={HEIGHT} id='analyser-canvas'></canvas>;
  }
}

Analyser.propTypes = {
  audioContext: PropTypes.object.isRequired
};

export default Analyser;