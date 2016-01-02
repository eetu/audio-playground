export function changeADSR(attack, decay, sustain, release) {
  return {type: 'CHANGE_ADSR', attack, decay, sustain, release};
}

export function changeOscillatorType(waveType) {
  return {type: 'CHANGE_OSCILLATOR_TYPE', waveType};
}

export function playNote(note, start, stop) {
  return {type: 'PLAY_NOTE', note, start, stop};
}

export function stopNote(note) {
  return {type: 'STOP_NOTE', note};
}

export function selectGridCell(x, y) {
  return {type: 'SELECT_GRID_CELL', x, y};
}
