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

export function mapKeyToNote(key, octave) {
  switch(key) {
  case 65:
    return 'C' + octave;
  case 87:
    return 'C#' + octave;
  case 83:
    return 'D' + octave;
  case 69:
    return 'D#' + octave;
  case 68:
    return 'E' + octave;
  case 70:
    return 'F' + octave;
  case 84:
    return 'F#' + octave;
  case 71:
    return 'G' + octave;
  case 89:
    return 'G#' + octave;
  case 72:
    return 'A' + octave;
  case 85:
    return 'A#' + octave;
  case 74:
    return 'B' + octave;
  case 75:
    return 'C' + (octave + 1);
  case 79:
    return 'C#' + (octave + 1);
  case 76:
    return 'D' + (octave + 1);
  case 80:
    return 'D#' + (octave + 1);
  default:
    return undefined;
  }
}
