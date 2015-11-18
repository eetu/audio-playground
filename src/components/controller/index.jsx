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
    const {oscillators, actions} = this.props;

    return (
      <div className='controller'>
        <button className='btn btn--action' onClick={this.handleOscillatorAdd.bind(this)}>Add Oscillator</button>

        <div>
          {oscillators.map(oscillator =>
            <Oscillator actions={actions} oscillator={oscillator}/>
          )}
        </div>
      </div>
    );
  }
}

Controller.propTypes = {
  oscillators: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

export default Controller;
