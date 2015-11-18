import React, {PropTypes, Component} from 'react';
import RangeSlider from '../rangeSlider';
import RadioField  from '../input/radio-field';

class Controller extends Component {
  constructor(props, context) {
    super(props, context);
  }

  // getInitialState() {
  //   return {freq: 300};
  // }

  // handleFreqChange(event) {
  //   let value = event.target.value;
  //   this.setState({freq: value, type: 'sine'});
  //   this.onFreqChange(value);
  // };

  // onFreqChange(value) {
  //   this.setState({freq: value});
  //   this.props.onFreqChanged(value);
  // };

  // onChangeType(value) {
  //   this.state.type = value;
  //   this.props.onTypeChanged(value);
  // };

  handleOscillatorAdd() {
    this.props.actions.addOscillator();
  }

  render() {
    return (
      <div className='controller'>
        <button className='btn btn--action' onClick={this.handleOscillatorAdd.bind(this)}>Add Oscillator</button>
        <RadioField text='sine' onChange={this.onChangeType}/>
        <RadioField text='square' onChange={this.onChangeType}/>
        <RadioField text='sawtooth' onChange={this.onChangeType}/>
        <RadioField text='triangle' onChange={this.onChangeType}/>

        <div>
          <RangeSlider onValueChanged={this.onFreqChange} min={0} max={20000} step={100}/>
        </div>
      </div>
    );
  }
}

Controller.propTypes = {
  oscillators: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

export default Controller;
