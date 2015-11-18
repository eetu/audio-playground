import React, {PropTypes, Component} from 'react';
import RangeSlider from '../rangeSlider';
import RadioField  from '../input/radio-field';

class Oscillator extends Component {
  handleVolumeChange(value) {
    console.log("volume", value);
  }

  render() {
    return (
      <div>
        <RadioField text='sine' onChange={this.onChangeType}/>
        <RadioField text='square' onChange={this.onChangeType}/>
        <RadioField text='sawtooth' onChange={this.onChangeType}/>
        <RadioField text='triangle' onChange={this.onChangeType}/>

        <div>
          <RangeSlider onValueChanged={this.handleVolumeChange.bind(this)} min={0} max={20000} step={100}/>
        </div>
      </div>
    );
  }
}

Oscillator.propTypes = {
  oscillator: PropTypes.object.isRequired
};

export default Oscillator;
