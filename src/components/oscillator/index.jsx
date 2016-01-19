import React, {PropTypes, Component} from 'react';
import {getDetuneArray, getMixArray, makeDistortionCurve} from '../../lib/helper';
import _ from 'lodash';
class Oscillator extends Component {
  constructor(props, context) {
    super(props, context);
    this.groups = [];
  }

  componentDidMount() {
    const {audioContext, oscillator, mix, detune, outputNode} = this.props;

    if(oscillator.type === 'super saw') {
      const mixArray = getMixArray(mix);
      const filter = audioContext.createBiquadFilter();

      filter.type = 'highpass';
      filter.frequency.value = 200;

      filter.connect(outputNode);

      getDetuneArray(detune).forEach((val, i) => {
        const start = _.random(0, 1 / 100);
        this.groups.push(this.createOscillator(this.props, filter, start, val, mixArray[i]));
      });
    } else {
      this.groups.push(this.createOscillator(this.props, outputNode, 0, 1, 1));
    }
  }

  componentDidUpdate() {
    const {oscillator, poly} = this.props;
    // TODO glide
    if(!poly) {
      _.first(this.groups).osc.frequency.setValueAtTime(oscillator.freq, 0);
    }
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

  createOscillator({audioContext, oscillator, actions, decay, attack, sustain, distortion}, node, start, detune, mix) {
    const now = audioContext.currentTime;
    // oscillator
    const osc = audioContext.createOscillator();
    osc.frequency.value = oscillator.freq * detune;
    osc.type = oscillator.type === 'super saw' ? 'sawtooth' : oscillator.type;
    osc.start(oscillator.start || start);

    // gain
    const gain = audioContext.createGain();
    gain.gain.cancelScheduledValues(now);
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(1, now + attack);
    gain.gain.linearRampToValueAtTime(sustain, now + attack + decay);
    const mixGain = audioContext.createGain();
    mixGain.gain.setValueAtTime(mix, now);

    // distortion
    const dist = audioContext.createWaveShaper();
    dist.curve = makeDistortionCurve(distortion);
    dist.oversample = '4x';

    // connections
    osc.connect(dist);
    dist.connect(gain);
    gain.connect(mixGain);
    mixGain.connect(node);

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
