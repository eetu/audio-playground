import React, {PropTypes, Component} from 'react';
import Oscillator from '../oscillator';
import RadioField from '../input/radio-field';

class Controller extends Component {
  constructor(props, context) {
    super(props, context);
    this.attack = 0.1;
    this.decay = 1;
  }

  handleTypeChange(type) {
    this.props.actions.changeOscillatorType(type);
  }

  render() {
    const {oscillators, actions, audioContext} = this.props;

    return (
      <div className='controller'>
        <div>
          <RadioField text='sine' onChange={this.handleTypeChange.bind(this)} checked/>
          <RadioField text='square' onChange={this.handleTypeChange.bind(this)}/>
          <RadioField text='sawtooth' onChange={this.handleTypeChange.bind(this)}/>
          <RadioField text='triangle' onChange={this.handleTypeChange.bind(this)}/>

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
