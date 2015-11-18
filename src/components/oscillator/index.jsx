import React, {PropTypes, Component} from 'react';
import RangeSlider from '../rangeSlider';
import RadioField  from '../input/radio-field';

class Oscillator extends Component {
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
          <RangeSlider onValueChanged={this.handleFreqChange.bind(this)} min={0} max={20000} step={100}/>
        </div>
      </div>
    );
  }
}

Oscillator.propTypes = {
  oscillator: PropTypes.object.isRequired
};

export default Oscillator;
