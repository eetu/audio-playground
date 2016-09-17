import {frequency} from '../lib/helper.js';

const initialGrid = [];

for(let i = 0; i < 8; i++) {
  initialGrid[i] = [false, false, false, false, false, false, false, false];
}

const intialState = {
  oscillators: [],
  grid: initialGrid,
  waveType: 'super saw',
  masterVolume: 100,
  attack: 0.01,
  decay: 0.02,
  sustain: 0.75,
  release: 0.25,
  distortion: 0,
  detune: 0.4,
  mix: 0.75,
  poly: true,
  glide: 0
};

export default function audio(state = intialState, action) {
  switch(action.type) {
  case 'PLAY_NOTE':
    const freq = frequency(action.note);
    const poly = state.poly;
    const oscillators = state.oscillators.filter((oscillator) => {
      return oscillator.id !== action.note;
    });
    const newOsc = {id: poly ? action.note : 'mono',
                    type: state.waveType,
                    gain: 1,
                    freq: freq,
                    start: action.start,
                    stop: action.stop};
    const newOscillators = poly ? [newOsc, ...oscillators] : [newOsc];
    return Object.assign({}, state, {
      oscillators: newOscillators
    });
  case 'STOP_NOTE':
    return Object.assign({}, state, {
      oscillators: state.oscillators.filter((oscillator) => {
        if(oscillator.id === 'mono') return false;
        return oscillator.id !== action.note;
      })
    });
  case 'SELECT_GRID_CELL':
    return Object.assign({}, state, {
      grid: state.grid.map((row, idx) =>
        row.map((column, j) =>
          idx === action.x && j === action.y ? !column : column))
    });
  case 'CHANGE_SETTING':
    return Object.assign({}, state, {
      [action.setting]: action.value
    });
  default:
    return state;
  }
}
