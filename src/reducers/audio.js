import {frequency} from '../lib/helper.js';

let initialGrid = [];

for (var i = 0; i < 8; i++) {
  initialGrid[i] = [false, false, false, false, false, false, false, false];
}

const intialState = {
  oscillators: [],
  grid: initialGrid,
  waveType: 'sine',
  masterVolume: 100
};

export default function audio(state = intialState, action) {
  switch(action.type) {
  // case 'ADD_OSCILLATOR':
  //   const id = state.oscillators.length;
  //   return Object.assign({}, state, {
  //     oscillators: [{id: id, type: 'sine', gain: 1, freq: 1000}, ...state.oscillators]
  //   });
  // case 'CHANGE_OSCILLATOR_FREQ':
  //   return Object.assign({}, state, {
  //     oscillators: state.oscillators.map((oscillator) => {
  //       if(oscillator.id === action.id) {
  //         oscillator.freq = action.freq;
  //       }
  //       return oscillator;
  //     })
  //   });
  case 'CHANGE_OSCILLATOR_TYPE':
    return Object.assign({}, state, {
      waveType: action.waveType
    });
  case 'PLAY_NOTE':
    const freq = frequency(action.note);
    return Object.assign({}, state, {
      oscillators: [{id: action.note,
                     type: state.waveType,
                     gain: 1,
                     freq: freq,
                     attack: action.attack || 0.05,
                     decay: action.decay || 0.5,
                     start: action.start,
                     stop: action.stop}, ...state.oscillators]
    });
  case 'STOP_NOTE':
    return Object.assign({}, state, {
      oscillators: state.oscillators.filter((oscillator) => {
        return oscillator.id !== action.note;
      })
    });
  case 'SELECT_GRID_CELL':
    return Object.assign({}, state, {
      grid: state.grid.map((row, i) =>
        row.map((column, j) =>
          i === action.x && j === action.y ? !column : column))
    })
  default:
    return state;
  }
}

