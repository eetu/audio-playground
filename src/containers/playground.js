import React, {Component, PropTypes} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Controller from '../components/controller';
import * as AudioActions from '../actions/audio';

class Playground extends Component {
  render() {
    const {audio, actions} = this.props;
    return (
      <div>
        <h1>Audio playground</h1>
        <Controller oscillators={audio.oscillators} actions={actions}/>
      </div>
    );
  }
}

Playground.propTypes = {
  audio: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
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
