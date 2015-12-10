import React, {PropTypes, Component} from 'react';
import Oscillator from '../oscillator';

class Controller extends Component {
  constructor(props, context) {
    super(props, context);
  }

  handleOscillatorAdd() {
    this.props.actions.addOscillator();
  }

  render() {
    const {oscillators, actions, audioContext} = this.props;

    return (
      <div className='controller'>
        <button className='btn btn--action' onClick={this.handleOscillatorAdd.bind(this)}>Add Oscillator</button>

        <div>
          {oscillators.map(oscillator =>
            <Oscillator key={oscillator.id} actions={actions} audioContext={audioContext} oscillator={oscillator}/>
          )}
        </div>
      </div>
    );
  }
}

Controller.propTypes = {
  audioContext: PropTypes.object.isRequired,
  oscillators: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

export default Controller;
