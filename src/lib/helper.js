import _ from 'lodash';

const f0 = 440;
const a = Math.pow(2, 1 / 12);

export function frequency(note) {
  const [, prefix, octave] = note.match(/(\w#{0,1})(\d)/);

  const higher = { 'C': 3,  'C#': 4,  'D': 5,
                   'D#': 6, 'E': 7,   'F': 8,
                   'F#': 9, 'G': 10,  'G#': 11,
                   'A': 12, 'A#': 13, 'B': 14 };

  const lower = { 'B': 2,  'A#': 1,   'A': 0,
                  'G#': -1, 'G': -2,  'F#': -3,
                  'F': -4,  'E': -5,  'D#': -6,
                  'D': -7,  'C#': -8, 'C': -9 };

  const steps = octave <= 4 ?
    lower[prefix] + 12 * (octave - 4) :
    higher[prefix] + 12 * (octave - 5);
  return f0 * Math.pow(a, steps);
}

export const qwerty = [ 65, 87, 83, 69, 68, 70, 84, 71, 89, 72, 85, 74, 75, 79, 76, 80, 186 ];

export const notes = [ 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B' ];

export function mapKeyToNote(key, octave) {
  let index = _.indexOf(qwerty, key);
  let o = octave;
  if(index >= notes.length) {
    index = index - notes.length;
    o += 1;
  }
  const note = _.at(notes, index);
  return note + o;
}

export function getNote(index, octave) {
  let i = index;
  let o = octave;
  if(i >= notes.length) {
    i = index - notes.length;
    o += 1;
  } else if(i < 0) {
    i = notes.length + index;
    o -= 1;
  }
  return notes[i] + o;
}