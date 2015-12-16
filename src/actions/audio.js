export function changeOscillatorType(waveType) {
  return {type: 'CHANGE_OSCILLATOR_TYPE', waveType};
}

export function playNote(note, waveType, attack, decay) {
  return {type: 'PLAY_NOTE', note, waveType, attack, decay};
}

export function stopNote(note) {
  return {type: 'STOP_NOTE', note};
}

export function selectGridCell(x, y) {
  return {type: 'SELECT_GRID_CELL', x, y};
}
