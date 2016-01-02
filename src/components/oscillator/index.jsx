import React, {PropTypes, Component} from 'react';

class Oscillator extends Component {
  constructor(props, context) {
    super(props, context);
    this.osc = undefined;
    this.gain = undefined;
  }

  componentWillMount() {
    const {audioContext, oscillator, actions, decay, attack, sustain} = this.props;
    const now = audioContext.currentTime;
    this.osc = audioContext.createOscillator();
    this.gain = audioContext.createGain();
    this.osc.connect(this.gain);
    this.osc.frequency.value = oscillator.freq;
    this.gain.connect(audioContext.destination);
    this.osc.type = oscillator.type;
    this.osc.start(oscillator.start || 0);
    this.gain.gain.cancelScheduledValues(now);

    this.gain.gain.setValueAtTime(0, now);
    this.attackTime = now + attack;
    this.gain.gain.linearRampToValueAtTime(1, this.attackTime);
    this.gain.gain.linearRampToValueAtTime(sustain, this.attackTime + decay);
    if(oscillator.stop) {
      console.log('stop', oscillator.stop);
      actions.stopNote(oscillator.id, oscillator.stop);
    }

    this.osc.onended = () => {
      this.gain.disconnect();
      this.osc.disconnect();
    };
  }

  componentWillUnmount() {
    const {audioContext, release} = this.props;
    const now = audioContext.currentTime;
    // stop when attack has finished
    const stopTime = now > this.attackTime ? now : this.attackTime;
    this.gain.gain.cancelScheduledValues(0);
    this.gain.gain.setValueAtTime(this.gain.gain.value, now);
    this.gain.gain.linearRampToValueAtTime(0, now + release);
    this.osc.stop(now + release);
  }

  render() {
    return (
      <div className='hidden'>{this.props.oscillator.id}</div>
    );
  }
}

Oscillator.propTypes = {
  audioContext: PropTypes.object.isRequired,
  oscillator: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};

export default Oscillator;
