export function changeAttack(attack) {
  return {type: 'CHANGE_ATTACK', attack};
}

export function changeDecay(decay) {
  return {type: 'CHANGE_DECAY', decay};
}

export function changeSustain(sustain) {
  return {type: 'CHANGE_SUSTAIN', sustain};
}

export function changeRelease(release) {
  return {type: 'CHANGE_RELEASE', release};
}

export function changeDistortion(distortion) {
  return {type: 'CHANGE_DISTORTION', distortion};
}

export function changeDetune(detune) {
  return {type: 'CHANGE_DETUNE', detune};
}

export function changeMix(mix) {
  return {type: 'CHANGE_MIX', mix};
}

export function setPoly(poly) {
  return {type: 'SET_POLY', poly};
}

export function changeGlide(glide) {
  return {type: 'CHANGE_GLIDE', glide};
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
