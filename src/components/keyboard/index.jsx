import React, {Component, PropTypes} from 'react';
import _ from 'lodash';
import {mapKeyToNote} from '../../lib/helper.js';

class Keyboard extends Component {
  constructor(props, context) {
    super(props, context);
    this.keysPressed = {};
    this.octave = 5;
  }

  componentWillMount() {
    document.addEventListener('keydown', this.handleKeyDown.bind(this), false);
    document.addEventListener('keyup', this.handleKeyUp.bind(this), false);
  }

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
      this.props.actions.playNote(note, 'sine', 0.1, 1);
      this.keysPressed[key] = true;
    }
  }

  handleKeyUp(event) {
    const key = event.keyCode;
    delete this.keysPressed[key];
    this.props.actions.stopNote(mapKeyToNote(key, this.octave));
  }

  render() {
    return (
      <div>
        <div>[play with your keyboard]</div>
      </div>
    );
  }
}

Keyboard.propTypes = {
  actions: PropTypes.object.isRequired
};

export default Keyboard;
