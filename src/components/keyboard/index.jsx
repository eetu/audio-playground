import React, {Component, PropTypes} from 'react';
import _ from 'lodash';
import {mapKeyToNote} from '../../lib/helper.js';
import RadioField  from '../input/radio-field';

class Keyboard extends Component {
  componentWillMount() {
    document.addEventListener('keydown', this.handleKeyDown.bind(this), false);
    document.addEventListener('keyup', this.handleKeyUp.bind(this), false);
  }

  keysPressed = {};

  octave = 5;
  waveType = 'sine';

  handleKeyDown(event) {
    const key = event.keyCode;
    if(key >= 48 && key <= 57) {
      this.octave = key - 48;
      _.keys(this.keysPressed).forEach((k) =>
        this.props.actions.stopNote(mapKeyToNote(k, this.octave)));
      return;
    }
    const note = mapKeyToNote(key, this.octave);
    if(!this.keysPressed[key] && note) {
      this.props.actions.playNote(note, this.waveType);
      this.keysPressed[key] = true;
    }
  }

  handleKeyUp(event) {
    const key = event.keyCode;
    delete this.keysPressed[key];
    this.props.actions.stopNote(mapKeyToNote(key, this.octave));
  }

  handleTypeChange(type) {
    this.waveType = type;
  }

  render() {
    return (
      <div>
        <div>[play with your keyboard]</div>
        <RadioField text='sine' onChange={this.handleTypeChange.bind(this)} checked/>
        <RadioField text='square' onChange={this.handleTypeChange.bind(this)}/>
        <RadioField text='sawtooth' onChange={this.handleTypeChange.bind(this)}/>
        <RadioField text='triangle' onChange={this.handleTypeChange.bind(this)}/>
      </div>
    );
  }
}

Keyboard.propTypes = {
  actions: PropTypes.object.isRequired
};

export default Keyboard;
