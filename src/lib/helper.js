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

export const keys = {
  65: 'C',
  87: 'C#',
  83: 'D',
  69: 'D#',
  68: 'E',
  70: 'F',
  84: 'F#',
  71: 'G',
  89: 'G#',
  72: 'A',
  85: 'A#',
  74: 'B',
  75: 'C',
  79: 'C#',
  76: 'D',
  80: 'D#'
};

// keep order of keys
export const arrayOfKeys = [
  [65, 'C'],
  [87, 'C#'],
  [83, 'D'],
  [69, 'D#'],
  [68, 'E'],
  [70, 'F'],
  [84, 'F#'],
  [71, 'G'],
  [89, 'G#'],
  [72, 'A'],
  [85, 'A#'],
  [74, 'B'],
  [75, 'C'],
  [79, 'C#'],
  [76, 'D'],
  [80, 'D#']
];

export function mapKeyToNote(key, octave) {
  if(_.include([75, 79, 76, 80], key)) {
    return keys[key] + (octave + 1);
  }
  return keys[key] + octave;
}

export function getNotes(octave) {
  return arrayOfKeys.map(([key, note]) => {
    if(_.include([75, 79, 76, 80], key)) {
      return note + (octave + 1);
    }
    return note + octave;
  });
}
