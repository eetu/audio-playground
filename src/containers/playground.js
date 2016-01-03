import React, {Component, PropTypes} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Controller from '../components/controller';
import Keyboard from '../components/keyboard';
import Analyser from '../components/analyser';
import Grid from '../components/grid';
import * as AudioActions from '../actions/audio';

class Playground extends Component {
  render() {
    const {audio, actions, audioContext} = this.props;
    return (
      <div>
        <Controller {...audio}
                    audioContext={audioContext}
                    actions={actions}/>
        <Keyboard actions={actions} oscillators={audio.oscillators}/>
      </div>
    );
  }
}
// <Grid actions={actions} grid={audio.grid} audioContext={audioContext}/>
// <Analyser audioContext={audioContext}/>

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
