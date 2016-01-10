import {frequency} from '../lib/helper.js';

const initialGrid = [];

for(let i = 0; i < 8; i++) {
  initialGrid[i] = [false, false, false, false, false, false, false, false];
}

const intialState = {
  oscillators: [],
  grid: initialGrid,
  waveType: 'sawtooth',
  masterVolume: 100,
  attack: 0.01,
  decay: 0.02,
  sustain: 0.75,
  release: 0.25,
  distortion: 0,
  detune: 0.4,
  mix: 0.75
};

export default function audio(state = intialState, action) {
  switch(action.type) {
  case 'CHANGE_OSCILLATOR_TYPE':
    return Object.assign({}, state, {
      waveType: action.waveType
    });
  case 'PLAY_NOTE':
    const freq = frequency(action.note);
    const oscillators = state.oscillators.filter((oscillator) => {
      return oscillator.id !== action.note;
    });
    return Object.assign({}, state, {
      oscillators: [{id: action.note,
                     type: state.waveType,
                     gain: 1,
                     freq: freq,
                     start: action.start,
                     stop: action.stop}, ...oscillators]
    });
  case 'STOP_NOTE':
    return Object.assign({}, state, {
      oscillators: state.oscillators.filter((oscillator) => {
        return oscillator.id !== action.note;
      })
    });
  case 'SELECT_GRID_CELL':
    return Object.assign({}, state, {
      grid: state.grid.map((row, idx) =>
        row.map((column, j) =>
          idx === action.x && j === action.y ? !column : column))
    });
  case 'CHANGE_ATTACK':
    return Object.assign({}, state, {
      attack: action.attack
    });
  case 'CHANGE_DECAY':
    return Object.assign({}, state, {
      decay: action.decay
    });
  case 'CHANGE_SUSTAIN':
    return Object.assign({}, state, {
      sustain: action.sustain
    });
  case 'CHANGE_RELEASE':
    return Object.assign({}, state, {
      release: action.release
    });
  case 'CHANGE_DISTORTION':
    return Object.assign({}, state, {
      distortion: action.distortion
    });
  case 'CHANGE_DETUNE':
    return Object.assign({}, state, {
      detune: action.detune
    });
  case 'CHANGE_MIX':
    return Object.assign({}, state, {
      mix: action.mix
    });
  default:
    return state;
  }
}

