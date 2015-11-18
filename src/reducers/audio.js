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
    return {
      ac: ac,
      oscillators: [{id: id, osc: osc, gain: gain}, ...state.oscillators],
      masterVolume: 100
    };
  case 'CHANGE_OSCILLATOR_FREQ':
    return {
      ac: ac,
      oscillators: state.oscillators.map(function(o) {
        if(o.id === action.id) {
          o.osc.frequency.value = action.freq;
        }
        return o;
      }),
      masterVolume: 100
    };
  case 'CHANGE_OSCILLATOR_TYPE':
    return {
      ac: ac,
      oscillators: state.oscillators.map(function(o) {
        if(o.id === action.id) {
          o.osc.type = action.waveType;
        }
        return o;
      }),
      masterVolume: 100
    };
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

