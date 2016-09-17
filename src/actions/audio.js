export function changeAttack(attack) {
  return {type: 'CHANGE_SETTING', setting: 'attack', value: attack};
}

export function changeDecay(decay) {
  return {type: 'CHANGE_SETTING', setting: 'decay', value: decay};
}

export function changeSustain(sustain) {
  return {type: 'CHANGE_SETTING', setting: 'sustain', value: sustain};
}

export function changeRelease(release) {
  return {type: 'CHANGE_SETTING', setting: 'release', value: release};
}

export function changeDistortion(distortion) {
  return {type: 'CHANGE_SETTING', setting: 'distortion', value: distortion};
}

export function changeDetune(detune) {
  return {type: 'CHANGE_SETTING', setting: 'detune', value: detune};
}

export function changeMix(mix) {
  return {type: 'CHANGE_SETTING', setting: 'mix', value: mix};
}

export function setPoly(poly) {
  return {type: 'CHANGE_SETTING', setting: 'poly', value: poly};
}

export function changeGlide(glide) {
  return {type: 'CHANGE_SETTING', setting: 'glide', value: glide};
}

export function changeOscillatorType(waveType) {
  return {type: 'CHANGE_SETTING', setting: 'waveType', value: waveType};
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
