const intialState = {
  ac: new AudioContext(),
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
    return {
      oscillators: [{osc: osc, gain: gain}, ...state.oscillators],
      masterVolume: 100
    };
  default:
    return state;
  }
}

// let osc = ac.createOscillator();

// var gain = ac.createGain();
// stop();

// osc.start();

// osc.connect(gain);
// osc.frequency.value = 200;
// gain.connect(ac.destination);

// function play() {
//   gain.gain.value = 1;
// }

// function stop() {
//   gain.gain.value = 0;
// }

// function setFrequency(f) {
//   osc.frequency.value = f;
// }

// function setType(type) {
//   osc.type = type;
// }
