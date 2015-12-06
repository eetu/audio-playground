const intialState = {
  oscillators: [],
  masterVolume: 100
};

export default function audio(state = intialState, action) {
  switch(action.type) {
  case 'ADD_OSCILLATOR':
    // const osc = state.ac.createOscillator();
    // osc.start();
    // const gain = state.ac.createGain();
    // osc.connect(gain);
    // osc.frequency.value = 200;
    // gain.connect(state.ac.destination);
    // gain.gain.value = 0;
    // osc.type = 'sine';
    const id = state.oscillators.length;
    return Object.assign({}, state, {
      oscillators: [{id: id, type: 'sine', gain: 1, freq: 1000}, ...state.oscillators]
    });
  case 'CHANGE_OSCILLATOR_FREQ':
    return Object.assign({}, state, {
      oscillators: state.oscillators.map(function(oscillator) {
        if(oscillator.id === action.id) {
          oscillator.freq = action.freq;
        }
        return oscillator;
      })
    });
  case 'CHANGE_OSCILLATOR_TYPE':
    return Object.assign({}, state, {
      oscillators: state.oscillators.map(function(oscillator) {
        if(oscillator.id === action.id) {
          oscillator.type = action.waveType;
        }
        return oscillator;
      })
    });
  case 'PLAY_NOTE':
    return Object.assign({}, state, {
      oscillators: state.oscillators.map(function(oscillator) {
        oscillator.freq = action.note;
        oscillator.gain = 1;
        return oscillator;
      })
    });
  case 'STOP_NOTE':
    return Object.assign({}, state, {
      oscillators: state.oscillators.map(function(oscillator) {
        oscillator.gain = 0;
        return oscillator;
      })
    });
  default:
    return state;
  }
}

