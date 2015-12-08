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
    }
    this.keysPressed[key] = true;
    switch(key) {
    case 65:
      this.props.actions.playNote(frequency('C' + this.octave));
      break;
    case 87:
      this.props.actions.playNote(frequency('C#' + this.octave));
      break;
    case 83:
      this.props.actions.playNote(frequency('D' + this.octave));
      break;
    case 69:
      this.props.actions.playNote(frequency('D#' + this.octave));
      break;
    case 68:
      this.props.actions.playNote(frequency('E' + this.octave));
      break;
    case 70:
      this.props.actions.playNote(frequency('F' + this.octave));
      break;
    case 84:
      this.props.actions.playNote(frequency('F#' + this.octave));
      break;
    case 71:
      this.props.actions.playNote(frequency('G' + this.octave));
      break;
    case 89:
      this.props.actions.playNote(frequency('G#' + this.octave));
      break;
    case 72:
      this.props.actions.playNote(frequency('A' + this.octave));
      break;
    case 85:
      this.props.actions.playNote(frequency('A#' + this.octave));
      break;
    case 74:
      this.props.actions.playNote(frequency('B' + this.octave));
      break;
    case 75:
      this.props.actions.playNote(frequency('C' + (this.octave + 1)));
      break;
    case 79:
      this.props.actions.playNote(frequency('C#' + (this.octave + 1)));
      break;
    case 76:
      this.props.actions.playNote(frequency('D' + (this.octave + 1)));
      break;
    case 80:
      this.props.actions.playNote(frequency('D#' + (this.octave + 1)));
      break;
    default:
      //
    }
  }

  handleKeyUp(event) {
    const key = event.keyCode;
    delete this.keysPressed[key];
    if(_.isEmpty(this.keysPressed)) {
      this.props.actions.stopNote();
    }
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
