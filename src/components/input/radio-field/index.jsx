import React, {Component} from 'react';

class RadioField extends Component {
  onValueChange(event) {
    this.props.onChange(event.target.value);
  }

  render() {
    return (
      <div className='radio-field'>
        <input type='radio' id={this.props.text} name='type' value={this.props.text}
          onChange={this.onValueChange.bind(this)} defaultChecked={this.props.checked}/>
        <label className={this.props.className} htmlFor={this.props.text}>{this.props.text}</label>
      </div>
    );
  }
}

export default RadioField;
