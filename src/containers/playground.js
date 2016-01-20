import React, {Component, PropTypes} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Controller from '../components/controller';
import Keyboard from '../components/keyboard';
import Grid from '../components/grid';
import * as AudioActions from '../actions/audio';
import Analyser from '../components/analyser';

class Playground extends Component {
  render() {
    const {audio, actions, audioContext} = this.props;
    const compressor = audioContext.createDynamicsCompressor();
    compressor.connect(audioContext.destination);
    return (
      <div>
        <Controller {...audio}
                    audioContext={audioContext}
                    node={compressor}
                    actions={actions}/>
        <Analyser audioContext={audioContext} node={compressor}/>
        <Keyboard actions={actions} oscillators={audio.oscillators} poly={audio.poly}/>
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
