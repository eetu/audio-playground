import React, {PropTypes, Component} from 'react';

class Oscillator extends Component {
  constructor(props, context) {
    super(props, context);
    this.osc = undefined;
    this.gain = undefined;
  }

  componentWillMount() {
    const {audioContext, oscillator} = this.props;
    this.osc = audioContext.createOscillator();
    this.gain = audioContext.createGain();
    this.osc.connect(this.gain);
    this.osc.frequency.value = oscillator.freq;
    this.gain.connect(audioContext.destination);
    this.gain.gain.value = 0; // oscillator.gain;
    this.osc.type = oscillator.type;
    this.osc.start();
    console.log('attach', oscillator.attack);
    this.gain.gain.linearRampToValueAtTime(1, audioContext.currentTime + oscillator.attack);

    this.osc.onended = () => {
      this.gain.disconnect();
      this.osc.disconnect();
    };
  }

  componentWillUnmount() {
    const {audioContext, oscillator} = this.props;
    const decay = audioContext.currentTime + 1;
    this.gain.gain.linearRampToValueAtTime(0, audioContext.currentTime + oscillator.decay);
    this.osc.stop(audioContext.currentTime + decay);
  }

  render() {
    return (
      <div>{this.props.oscillator.id}</div>
    );
  }
}

Oscillator.propTypes = {
  audioContext: PropTypes.object.isRequired,
  oscillator: PropTypes.object.isRequired
};

export default Oscillator;
