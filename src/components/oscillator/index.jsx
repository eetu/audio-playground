import React, {PropTypes, Component} from 'react';
import RangeSlider from '../rangeSlider';
import RadioField  from '../input/radio-field';

class Oscillator extends Component {
  componentWillMount() {
    const {audioContext, oscillator} = this.props;
    this.osc = audioContext.createOscillator();
    this.osc.start();
    this.gain = audioContext.createGain();
    this.osc.connect(this.gain);
    this.osc.frequency.value = oscillator.freq;
    this.gain.connect(audioContext.destination);
    this.gain.gain.value = oscillator.gain;
    this.osc.type = oscillator.type;
  }

  componentDidUpdate() {
    const {oscillator} = this.props;
    this.osc.frequency.value = oscillator.freq;
    this.gain.gain.value = oscillator.gain;
    this.osc.type = oscillator.type;
  }

  componentWillUnmount() {
    this.osc.stop();
    this.osc.disconnect();
    this.gain.disconnect();
  }

  osc = undefined;
  gain = undefined;

  handleFreqChange(value) {
    this.props.actions.changeOscillatorFreq(this.props.oscillator.id, value);
  }

  handleTypeChange(type) {
    this.props.actions.changeOscillatorType(this.props.oscillator.id, type);
  }

  render() {
    return (
      <div>
        <RadioField text='sine' onChange={this.handleTypeChange.bind(this)}/>
        <RadioField text='square' onChange={this.handleTypeChange.bind(this)}/>
        <RadioField text='sawtooth' onChange={this.handleTypeChange.bind(this)}/>
        <RadioField text='triangle' onChange={this.handleTypeChange.bind(this)}/>

        <div>
          <RangeSlider value={this.props.oscillator.freq} onValueChanged={this.handleFreqChange.bind(this)} min={0} max={20000} step={100}/>
        </div>
      </div>
    );
  }
}

Oscillator.propTypes = {
  audioContext: PropTypes.object.isRequired,
  oscillator: PropTypes.object.isRequired
};

export default Oscillator;
