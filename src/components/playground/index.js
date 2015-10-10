import React from 'react';
import Controller from '../controller';

export default React.createClass({
  render() {
    return (
      <div>
        <h1>Audio playground</h1>
        <Controller onPlay={play} onStop={stop} onFreqChanged={setFrequency}/>
      </div>
    );
  }
});

let ac = new AudioContext();
let osc = ac.createOscillator();

var gain = ac.createGain();
stop();

osc.start();

osc.connect(gain);
osc.frequency.value = 200;
gain.connect(ac.destination);

function play() {
  gain.gain.value = 1;
}

function stop() {
  gain.gain.value = 0;
}

function setFrequency(f) {
  osc.frequency.value = f;
}
