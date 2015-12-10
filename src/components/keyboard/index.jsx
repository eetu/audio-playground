import React, {Component, PropTypes} from 'react';
import _ from 'lodash';
import {frequency} from '../../lib/helper.js';

class Keyboard extends Component {
  componentWillMount() {
    document.addEventListener('keydown', this.handleKeyDown.bind(this), false);
    document.addEventListener('keyup', this.handleKeyUp.bind(this), false);
  }

  keysPressed = {};

  octave = 5;

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
      <div>[add osc, and play your asdasdasd]</div>
    );
  }
}

Keyboard.propTypes = {
  actions: PropTypes.object.isRequired
};

export default Keyboard;
