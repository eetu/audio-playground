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
    this.osc.start(oscillator.start || 0);
    this.gain.gain.cancelScheduledValues(audioContext.currentTime);
    this.gain.gain.setValueAtTime(0, audioContext.currentTime);
    this.attackTime = audioContext.currentTime + oscillator.attack;
    this.gain.gain.linearRampToValueAtTime(1, this.attackTime);

    this.osc.onended = () => {
      this.gain.disconnect();
      this.osc.disconnect();
    };
  }

  componentWillUnmount() {
    const {audioContext, oscillator} = this.props;
    // stop when attack has finished
    const stopTime = audioContext.currentTime > this.attackTime ? audioContext.currentTime : this.attackTime;
    this.gain.gain.linearRampToValueAtTime(0, stopTime + oscillator.decay);
    this.osc.stop(stopTime + oscillator.decay);
  }

  render() {
    return (
      <div className='hidden'>{this.props.oscillator.id}</div>
    );
  }
}

Oscillator.propTypes = {
  audioContext: PropTypes.object.isRequired,
  oscillator: PropTypes.object.isRequired
};

export default Oscillator;
