import React from 'react';
import RangeSlider from '../rangeSlider';

export default React.createClass({
  getInitialState() {
    return {freq: 300};
  },
  handleFreqChange(event) {
    let value = event.target.value;
    this.setState({freq: value});
    this.onFreqChange(value);
  },
  onFreqChange(value) {
    this.state.freq = value;
    this.props.onFreqChanged(value);
  },
  render() {
    return (
      <div className='controller'>
        <button className='btn btn__action' onClick={this.props.onPlay}>Play</button>
        <button className='btn btn__action' onClick={this.props.onStop}>Stop</button>
        <RangeSlider onValueChanged={this.onFreqChange} min={0} max={20000} step={100}/>
      </div>
    );
  }
});

