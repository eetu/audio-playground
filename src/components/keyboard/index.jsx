import React, {Component, PropTypes} from 'react';
import _ from 'lodash';
import {mapKeyToNote, arrayOfKeys, getNotes} from '../../lib/helper.js';
import classNames from 'classnames';

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
      this.props.actions.playNote(note);
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
      <div className='keyboard'>
        {_.map(getNotes(this.octave), (val, index) => {
          const notesPlaying = _.pluck(this.props.oscillators, 'id');
          const notes = getNotes(this.octave);
          const classes = classNames({
            'keyboard__key': true,
            'keyboard__key--active': _.contains(notesPlaying, val)
          });
          if(_.contains(val, '#')) {
            // nothing
          } else if(index < notes.length - 1 && _.contains(notes[index - 1], '#')) {
            const blackClass = classNames({
              'keyboard__key': true,
              'keyboard__key--black': true,
              'keyboard__key--active': _.contains(notesPlaying, notes[index - 1])
            });
            return (
              <div key={val} className={classes}>
                <div className={blackClass}></div>
              </div>);
          } else {
            return <div key={val} className={classes}>{_.contains(val, 'C') ? val : ''}</div>;
          }
        })}
      </div>
    );
  }
}

Keyboard.propTypes = {
  actions: PropTypes.object.isRequired,
  oscillators: PropTypes.array.isRequired
};

export default Keyboard;
