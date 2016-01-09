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

export function getNote(index, octave) {
  const multiple = Math.floor(index / notes.length);
  const i = ((index % notes.length) + notes.length) % notes.length;
  const o = octave + multiple;
  return notes[i] + o;
}

export function mapKeyToNote(key, octave) {
  const index = _.indexOf(qwerty, key);
  if(index === -1) return;
  return getNote(index, octave);
}

// https://www.nada.kth.se/utbildning/grukth/exjobb/rapportlistor/2010/rapporter10/szabo_adam_10131.pdf
export function getDetuneAmount(x) {
  return (10028.7312891634  * Math.pow(x, 11)) - (50818.8652045924  * Math.pow(x, 10)) +
    (111363.4808729368 * Math.pow(x,  9)) - (138150.6761080548 * Math.pow(x,  8)) +
    (106649.6679158292 * Math.pow(x,  7)) - (53046.9642751875  * Math.pow(x,  6)) +
    (17019.9518580080  * Math.pow(x,  5)) - (3425.0836591318   * Math.pow(x,  4)) +
    (404.2703938388    * Math.pow(x,  3)) - (24.1878824391     * Math.pow(x,  2)) +
    (0.6717417634      * x) +
    0.0030115596;
}

export function getDetuneArray(x) {
  const amount = getDetuneAmount(x);
  return [1 - 0.11002313 * amount,
          1 - 0.06288439 * amount,
          1 - 0.01952356 * amount,
          1 + 0,
          1 + 0.01991221 * amount,
          1 + 0.06216538 * amount,
          1 + 0.10745242 * amount];
}
