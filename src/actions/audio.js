export function addOscillator() {
  return {type: 'ADD_OSCILLATOR'};
}

export function changeOscillatorFreq(id, freq) {
  return {type: 'CHANGE_OSCILLATOR_FREQ', id, freq};
}

export function changeOscillatorType(id, waveType) {
  return {type: 'CHANGE_OSCILLATOR_TYPE', id, waveType};
}

export function playNote(note, waveType, attack, decay) {
  return {type: 'PLAY_NOTE', note, waveType, attack, decay};
}

export function stopNote(id) {
  return {type: 'STOP_NOTE', id};
}
