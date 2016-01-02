import React, {Component, PropTypes} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Controller from '../components/controller';
import Keyboard from '../components/keyboard';
import Grid from '../components/grid';
import * as AudioActions from '../actions/audio';

class Playground extends Component {
  render() {
    const {audio, actions, audioContext} = this.props;
    return (
      <div>
        <Controller oscillators={audio.oscillators}
                    audioContext={audioContext}
                    actions={actions}
                    attack={audio.attack}
                    decay={audio.decay}
                    sustain={audio.sustain}
                    release={audio.release}/>
        <Keyboard actions={actions} oscillators={audio.oscillators}/>
      </div>
    );
  }
}
// <Grid actions={actions} grid={audio.grid} audioContext={audioContext}/>

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
