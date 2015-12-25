import React, {Component} from 'react';

class RangeSlider extends Component {
  componentDidUpdate() {
    // TODO no need for internal value
    this.value = this.props.value;
  }

  value = 300;

  handleValueChange(event) {
    const value = event.target.value;
    this.value = value;
    this.props.onValueChanged(value);
  }

  handleMouseWheel(event) {
    event.preventDefault();

    let newValue = this.value + event.deltaY * this.props.step;
    if(newValue < this.props.min) {
      newValue = this.props.min;
    } else if(newValue > this.props.max) {
      newValue = this.props.max;
    }
    this.value = newValue;
    this.props.onValueChanged(newValue);
  }

  render() {
    return (
      <div className='range-slider' onWheel={this.handleMouseWheel.bind(this)}>
        <input type='range' className='range-slider__slider' min={this.props.min}
          orient='vertical' value={this.value} max={this.props.max} step={this.props.step}
          onChange={this.handleValueChange.bind(this)}/>
        <br/>
        <input type='text' className='range-slider__input' value={this.value}
          onChange={this.handleValueChange.bind(this)}/>
      </div>
    );
  }
}

export default RangeSlider;