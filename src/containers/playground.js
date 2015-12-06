import React, {Component, PropTypes} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Controller from '../components/controller';
import Keyboard from '../components/keyboard';
import * as AudioActions from '../actions/audio';

class Playground extends Component {
  render() {
    // console.log('props', this.props);
    const {audio, actions, audioContext} = this.props;
    return (
      <div>
        <h1>Audio playground</h1>
        <Keyboard actions={actions} />
        <Controller oscillators={audio.oscillators} audioContext={audioContext} actions={actions} />
      </div>
    );
  }
}

Playground.propTypes = {
  audio: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
  audioContext: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    audio: state.audio
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(AudioActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Playground);

// let osc = ac.createOscillator();

// var gain = ac.createGain();
// stop();

// osc.start();

// osc.connect(gain);
// osc.frequency.value = 200;
// gain.connect(ac.destination);

// function play() {
//   gain.gain.value = 1;
// }

// function stop() {
//   gain.gain.value = 0;
// }

// function setFrequency(f) {
//   osc.frequency.value = f;
// }

// function setType(type) {
//   osc.type = type;
// }
