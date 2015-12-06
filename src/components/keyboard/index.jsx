import React, {Component, PropTypes} from 'react';
import _ from 'lodash';
import * as Notes from '../../constants/notes';

class Keyboard extends Component {
  componentWillMount() {
    document.addEventListener('keydown', this.handleKeyDown.bind(this), false);
    document.addEventListener('keyup', this.handleKeyUp.bind(this), false);
  }

  keysPressed = {}

  handleKeyDown(event) {
    const key = event.keyCode;
    this.keysPressed[key] = true;
    switch(key) {
    case 65:
      this.props.actions.playNote(Notes.C5);
      break;
    case 83:
      this.props.actions.playNote(Notes.D5);
      break;
    case 68:
      this.props.actions.playNote(Notes.E5);
      break;
    case 70:
      this.props.actions.playNote(Notes.F5);
      break;
    case 71:
      this.props.actions.playNote(Notes.G5);
      break;
    case 72:
      this.props.actions.playNote(Notes.A5);
      break;
    case 74:
      this.props.actions.playNote(Notes.B5);
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
      <div>[A S D F G H J]</div>
    );
  }
}

Keyboard.propTypes = {
  actions: PropTypes.object.isRequired
};

export default Keyboard;
