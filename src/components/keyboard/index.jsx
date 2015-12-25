import React, {Component, PropTypes} from 'react';
import _ from 'lodash';
import {mapKeyToNote, getNote, qwerty} from '../../lib/helper.js';
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

  handleTouchStart(note, e) {
    this.props.actions.playNote(note);
    e.stopPropagation();
  }

  handleTouchEnd(note) {
    this.props.actions.stopNote(note);
  }

  handleMouseDown(note, e) {
    this.props.actions.playNote(note);
    e.stopPropagation();
  }

  handleMouseUp(note) {
    this.props.actions.stopNote(note);
  }

  handleMouseEnter(note, e) {
    if(e.buttons) this.props.actions.playNote(note);
    e.stopPropagation();
  }

  handleMouseLeave(note) {
    this.props.actions.stopNote(note);
  }

  handleKeyDown(event) {
    const key = event.keyCode;
    const note = mapKeyToNote(key, this.octave);

    if(key >= 48 && key <= 57) {
      this.octave = key - 48;
      _.keys(this.keysPressed).forEach((n) =>
        this.props.actions.stopNote(n));
      return;
    }

    if(note && !this.keysPressed[note]) {
      this.props.actions.playNote(note);
      this.keysPressed[note] = true;
    }
  }

  handleKeyUp(event) {
    const note = mapKeyToNote(event.keyCode, this.octave);
    delete this.keysPressed[note];
    this.props.actions.stopNote(note);
  }

  render() {
    return (
      <div className='keyboard'>
        {_.map(qwerty, (key, index) => {
          const notesPlaying = _.pluck(this.props.oscillators, 'id');
          const note = getNote(index, this.octave);
          const classes = classNames({
            'keyboard__key': true,
            'keyboard__key--active': _.contains(notesPlaying, note)
          });

          const previousNote = getNote(index - 1, this.octave);

          const mouseEvents = {
            onMouseDown: this.handleMouseDown.bind(this, note),
            onMouseUp: this.handleMouseUp.bind(this, note),
            onMouseEnter: this.handleMouseEnter.bind(this, note),
            onMouseOut: this.handleMouseLeave.bind(this, note),
            onTouchStart: this.handleTouchStart.bind(this, note),
            onTouchEnd: this.handleTouchEnd.bind(this, note)
          };

          const blackMouseEvents = {
            onMouseDown: this.handleMouseDown.bind(this, previousNote),
            onMouseUp: this.handleMouseUp.bind(this, previousNote),
            onMouseEnter: this.handleMouseEnter.bind(this, previousNote),
            onMouseOut: this.handleMouseLeave.bind(this, previousNote),
            onTouchStart: this.handleTouchStart.bind(this, previousNote),
            onTouchEnd: this.handleTouchEnd.bind(this, previousNote)
          };

          if(_.contains(note, '#')) {
            // nothing
          } else if(_.contains(previousNote, '#')) {
            const blackClass = classNames({
              'keyboard__key': true,
              'keyboard__key--black': true,
              'keyboard__key--active': _.contains(notesPlaying, previousNote)
            });
            return (
              <div key={note} className={classes} {...mouseEvents}>
                <div className={blackClass} {...blackMouseEvents}></div>
              </div>);
          } else {
            return <div key={note} className={classes} {...mouseEvents}>
              <span>{_.contains(note, 'C') ? note : ''}</span>
            </div>;
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
