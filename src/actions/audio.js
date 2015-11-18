export function addOscillator() {
  return {type: 'ADD_OSCILLATOR'};
}

export function changeOscillatorFreq(id, freq) {
  return {type: 'CHANGE_OSCILLATOR_FREQ', id, freq};
}

export function changeOscillatorType(id, waveType) {
  return {type: 'CHANGE_OSCILLATOR_TYPE', id, waveType};
}
