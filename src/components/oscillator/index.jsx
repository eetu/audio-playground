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
    this.osc.type = oscillator.type;
    this.osc.start(oscillator.start || 0);
    this.gain.gain.cancelScheduledValues(audioContext.currentTime);
    this.gain.gain.setValueAtTime(0, audioContext.currentTime);
    this.gain.gain.linearRampToValueAtTime(1, audioContext.currentTime + oscillator.attack);

    this.osc.onended = () => {
      this.gain.disconnect();
      this.osc.disconnect();
    };
  }

  componentWillUnmount() {
    const {audioContext, oscillator} = this.props;
    this.gain.gain.cancelScheduledValues(audioContext.currentTime);
    this.gain.gain.linearRampToValueAtTime(0, audioContext.currentTime + oscillator.decay);
    this.osc.stop(audioContext.currentTime + oscillator.decay);
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
