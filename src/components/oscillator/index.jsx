import React, {PropTypes, Component} from 'react';

class Oscillator extends Component {
  constructor(props, context) {
    super(props, context);
    this.osc = undefined;
    this.gain = undefined;
  }

  componentWillMount() {
    const {audioContext, oscillator, actions, decay, attack, sustain, distortion} = this.props;
    const now = audioContext.currentTime;

    // oscillator
    this.osc = audioContext.createOscillator();
    this.osc.frequency.value = oscillator.freq;
    this.osc.type = oscillator.type;
    this.osc.start(oscillator.start || 0);

    // gain
    this.gain = audioContext.createGain();
    this.gain.gain.cancelScheduledValues(now);
    this.gain.gain.setValueAtTime(0, now);
    this.attackTime = now + attack;
    this.gain.gain.linearRampToValueAtTime(1, this.attackTime);
    this.gain.gain.linearRampToValueAtTime(sustain, this.attackTime + decay);

    // distortion
    this.distortion = audioContext.createWaveShaper();
    this.distortion.curve = this.makeDistortionCurve(distortion);
    this.distortion.oversample = '4x';

    // connections
    console.log('distortion', distortion);
    this.osc.connect(this.distortion);
    this.distortion.connect(this.gain);
    this.gain.connect(audioContext.destination);

    if(oscillator.stop) {
      console.log('stop', oscillator.stop);
      actions.stopNote(oscillator.id, oscillator.stop);
    }

    // disconnect after stop
    this.osc.onended = () => {
      this.gain.disconnect();
      this.osc.disconnect();
      this.distortion.disconnect();
    };
  }

  componentWillUnmount() {
    const {audioContext, release} = this.props;
    const now = audioContext.currentTime;
    // stop when attack has finished
    const stopTime = now > this.attackTime ? now : this.attackTime;
    this.gain.gain.linearRampToValueAtTime(0, stopTime + release);
    this.osc.stop(stopTime + release);
  }

  // Example from https://developer.mozilla.org/en-US/docs/Web/API/WaveShaperNode
  makeDistortionCurve(amount) {
    const k = amount;
    const samples = 44100;
    const curve = new Float32Array(samples);
    const deg = Math.PI / 180;

    for(let i = 0; i < samples; ++i) {
      const x = i * 2 / samples - 1;
      curve[i] = (3 + k) * x * 20 * deg / (Math.PI + k * Math.abs(x));
    }
    return curve;
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
