import React, {Component} from 'react';

class FlipSwitch extends Component {
  onValueChange(event) {
    this.props.onChange(event.target.checked);
  }

  render() {
    return (
      <div className='flip-switch'>
        <label className='flip-switch__left-label' htmlFor={this.props.text}>{this.props.offText}</label>
        <input className='flip-switch__checkbox' type='checkbox' id='foobar' onChange={this.onValueChange.bind(this)} defaultChecked={this.props.checked}/>
        <label className='flip-switch__switch-border' htmlFor='foobar'>
          <span className='flip-switch__switch'></span>
        </label>
        <label className='flip-switch__right-label' htmlFor={this.props.text}>{this.props.onText}</label>
      </div>
    );
  }
}

export default FlipSwitch;
