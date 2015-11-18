import React, {PropTypes, Component} from 'react';
import Oscillator from '../oscillator';

class Controller extends Component {
  constructor(props, context) {
    super(props, context);
  }

  // getInitialState() {
  //   return {freq: 300};
  // }

  // handleFreqChange(event) {
  //   let value = event.target.value;
  //   this.setState({freq: value, type: 'sine'});
  //   this.onFreqChange(value);
  // };

  // onFreqChange(value) {
  //   this.setState({freq: value});
  //   this.props.onFreqChanged(value);
  // };

  // onChangeType(value) {
  //   this.state.type = value;
  //   this.props.onTypeChanged(value);
  // };

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
