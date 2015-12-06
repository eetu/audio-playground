import React, {Component} from 'react';

class RadioField extends Component {
  onValueChange(event) {
    this.props.onChange(event.target.value);
  }

  render() {
    return (
      <div className='radio-field'>
        <input type='radio' name='type' value={this.props.text}
          onChange={this.onValueChange.bind(this)}/>
        <label>{this.props.text}</label>
      </div>
    );
  }
}

export default RadioField;
