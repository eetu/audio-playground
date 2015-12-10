import {frequency} from '../lib/helper.js';

const intialState = {
  oscillators: [],
  masterVolume: 100
};

export default function audio(state = intialState, action) {
  switch(action.type) {
  case 'ADD_OSCILLATOR':
    const id = state.oscillators.length;
    return Object.assign({}, state, {
      oscillators: [{id: id, type: 'sine', gain: 1, freq: 1000}, ...state.oscillators]
    });
  case 'CHANGE_OSCILLATOR_FREQ':
    return Object.assign({}, state, {
      oscillators: state.oscillators.map((oscillator) => {
        if(oscillator.id === action.id) {
          oscillator.freq = action.freq;
        }
        return oscillator;
      })
    });
  case 'CHANGE_OSCILLATOR_TYPE':
    return Object.assign({}, state, {
      oscillators: state.oscillators.map((oscillator) => {
        if(oscillator.id === action.id) {
          oscillator.type = action.waveType;
        }
        return oscillator;
      })
    });
  case 'PLAY_NOTE':
    const noteId = action.note;
    const freq = frequency(action.note);
    const type = action.waveType || 'sine';
    return Object.assign({}, state, {
      oscillators: [{id: noteId, type: type, gain: 1, freq: freq}, ...state.oscillators]
    });
  case 'STOP_NOTE':
    return Object.assign({}, state, {
      oscillators: state.oscillators.filter((oscillator) => {
        return oscillator.id !== action.id;
      })
    });
  default:
    return state;
  }
}

