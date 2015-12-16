export function changeOscillatorType(waveType) {
  return {type: 'CHANGE_OSCILLATOR_TYPE', waveType};
}

export function playNote(note, waveType, attack, decay) {
  return {type: 'PLAY_NOTE', note, waveType, attack, decay};
}

export function stopNote(id) {
  return {type: 'STOP_NOTE', id};
}

export function selectGridCell(x, y) {
  return {type: 'SELECT_GRID_CELL', x, y};
}
