import React, {Component} from 'react';

class RangeSlider extends Component {
  constructor(props, context) {
    super(props, context);
    this.value = props.value;
  }

  handleValueChange(event) {
    const value = event.target.value;
    this.value = value;
    this.props.onChange(value);
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
    this.props.onChange(newValue);
  }

  render() {
    return (
      <div className='range-slider' onWheel={this.handleMouseWheel.bind(this)}>
        <input type='range' className='range-slider__slider' min={this.props.min}
          orient='vertical' value={this.value} max={this.props.max} step={this.props.step}
          onChange={this.handleValueChange.bind(this)}/>
        {this.props.showInput ? <input type='text' className='range-slider__input' value={this.value}
          onChange={this.handleValueChange.bind(this)}/> : ''}
        {this.props.label ? <label className='range-slider__label'>{this.props.label}</label> : ''}
      </div>
    );
  }
}

export default RangeSlider;
