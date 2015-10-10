import React from 'react';

export default React.createClass({
  getInitialState() {
    return {value: 300};
  },
  handleValueChange(event) {
    let value = event.target.value;
    this.setState({value: value});
    this.props.onValueChanged(value);
  },
  render() {
    return (
      <div className="range-slider">
        <input type="range" className="range-slider__slider" min={this.props.min} orient="vertical" value={this.state.value} max={this.props.max} step={this.props.step} onChange={this.handleValueChange}/>
        <input type="text" className="range-slider__input" value={this.state.value} onChange={this.handleValueChange} />
      </div>
    );
  }
});
