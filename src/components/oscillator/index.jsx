import React, {PropTypes, Component} from 'react';
import {getDetuneArray, makeDistortionCurve} from '../../lib/helper';

class Oscillator extends Component {
  constructor(props, context) {
    super(props, context);
    this.groups = [];
  }

  componentWillMount() {
    getDetuneArray(this.props.detune).forEach((val) => {
      this.groups.push(this.createOscillator(this.props, val));
    });
  }

  componentWillUnmount() {
    const {audioContext, release, attack} = this.props;
    const now = audioContext.currentTime;
    // stop when attack has finished
    this.groups.forEach((g) => {
      const attackTime = g.startTime + attack;
      const stopTime = now > attackTime ? now : attackTime;
      g.gain.gain.linearRampToValueAtTime(0, stopTime + release);
      g.osc.stop(stopTime + release);
    });
  }

  createOscillator({audioContext, oscillator, actions, decay, attack, sustain, distortion}, detune) {
    const now = audioContext.currentTime;
    // oscillator
    const osc = audioContext.createOscillator();
    osc.frequency.value = oscillator.freq * detune;
    osc.type = oscillator.type;
    osc.start(oscillator.start || 0);

    // gain
    const gain = audioContext.createGain();
    gain.gain.cancelScheduledValues(now);
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(1, now + attack);
    gain.gain.linearRampToValueAtTime(sustain, now + attack + decay);

    // distortion
    const dist = audioContext.createWaveShaper();
    dist.curve = makeDistortionCurve(distortion);
    dist.oversample = '4x';

    // connections
    osc.connect(dist);
    dist.connect(gain);
    gain.connect(audioContext.destination);

    if(oscillator.stop) {
      console.log('stop', oscillator.stop);
      actions.stopNote(oscillator.id, oscillator.stop);
    }

    // disconnect after stop
    osc.onended = () => {
      gain.disconnect();
      osc.disconnect();
      dist.disconnect();
    };

    return {osc: osc,
            gain: gain,
            distortion: distortion,
            startTime: now};
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
