import React, {PropTypes, Component} from 'react';

class Oscillator extends Component {
  componentWillMount() {
    const {audioContext, oscillator} = this.props;
    this.osc = audioContext.createOscillator();
    this.gain = audioContext.createGain();
    this.osc.connect(this.gain);
    this.osc.frequency.value = oscillator.freq;
    this.gain.connect(audioContext.destination);
    this.gain.gain.value = oscillator.gain;
    this.osc.type = oscillator.type;
    this.osc.start();
  }

  componentWillUnmount() {
    this.osc.stop();
    this.osc.disconnect();
    this.gain.disconnect();
  }

  osc = undefined;
  gain = undefined;

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
