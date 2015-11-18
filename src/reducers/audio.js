const ac = new AudioContext();

const intialState = {
  ac: ac,
  oscillators: [],
  masterVolume: 100
};

export default function audio(state = intialState, action) {
  switch(action.type) {
  case 'ADD_OSCILLATOR':
    const osc = state.ac.createOscillator();
    osc.start();
    const gain = state.ac.createGain();
    osc.connect(gain);
    osc.frequency.value = 200;
    gain.connect(state.ac.destination);
    gain.gain.value = 1;
    osc.type = 'sine';
    const id = state.oscillators.length;
    return Object.assign({}, state, {
      oscillators: [{id: id, osc: osc, gain: gain}, ...state.oscillators]
    });
  case 'CHANGE_OSCILLATOR_FREQ':
    return Object.assign({}, state, {
      oscillators: state.oscillators.map(function(oscillator) {
        if(oscillator.id === action.id) {
          oscillator.osc.frequency.value = action.freq;
        }
        return oscillator;
      })
    });
  case 'CHANGE_OSCILLATOR_TYPE':
    return Object.assign({}, state, {
      oscillators: state.oscillators.map(function(oscillator) {
        if(oscillator.id === action.id) {
          oscillator.osc.type = action.waveType;
        }
        return oscillator;
      })
    });
  default:
    return state;
  }
}

// function play() {
//   gain.gain.value = 1;
// }

// function stop() {
//   gain.gain.value = 0;
// }

