import React from 'react';

export default React.createClass({
  onValueChange(event) {
    this.props.onChange(event.target.value);
  },
  render() {
    return (
      <div className='radio-field'>
        <input type='radio' name='type' value={this.props.text} onChange={this.onValueChange}/>
        <label>{this.props.text}</label>
      </div>
    );
  }
});
