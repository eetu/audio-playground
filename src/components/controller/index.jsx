import React, {PropTypes, Component} from 'react';
import Oscillator from '../oscillator';
import RadioField from '../input/radio-field';
import RangeSlider from '../input/range-slider';

class Controller extends Component {
  handleTypeChange(type) {
    this.props.actions.changeOscillatorType(type);
  }

  handleAttackChange(value) {
    this.props.actions.changeAttack(parseFloat(value));
  }

  handleDecayChange(value) {
    this.props.actions.changeDecay(parseFloat(value));
  }

  handleSustainChange(value) {
    this.props.actions.changeSustain(parseFloat(value));
  }

  handleReleaseChange(value) {
    this.props.actions.changeRelease(parseFloat(value));
  }

  handleDistortionChange(value) {
    this.props.actions.changeDistortion(parseFloat(value));
  }

  render() {
    const {oscillators, actions, audioContext, attack, decay, sustain, release, distortion} = this.props;
    return (
      <div className='controller'>
        <div>
          <div className='controller__wave-type'>
            <RadioField text='sine' onChange={this.handleTypeChange.bind(this)} checked/>
            <RadioField text='square' onChange={this.handleTypeChange.bind(this)}/>
            <RadioField text='sawtooth' onChange={this.handleTypeChange.bind(this)}/>
            <RadioField text='triangle' onChange={this.handleTypeChange.bind(this)}/>
          </div>
          <div className='controller__adsr'>
            <RangeSlider min={0} max={1} step={0.01} value={attack} label='att' onChange={this.handleAttackChange.bind(this)} />
            <RangeSlider min={0} max={1} step={0.01} value={decay} label='dec' onChange={this.handleDecayChange.bind(this)} />
            <RangeSlider min={0} max={1} step={0.01} value={sustain} label='sus' onChange={this.handleSustainChange.bind(this)} />
            <RangeSlider min={0} max={1} step={0.01} value={release} label='rel' onChange={this.handleReleaseChange.bind(this)} />
          </div>
          <div className='controller__distortion'>
             <RangeSlider min={0} max={100} step={1} value={distortion} label='dist' onChange={this.handleDistortionChange.bind(this)} />
          </div>
          {oscillators.map(oscillator =>
            <Oscillator key={oscillator.id}
                        actions={actions}
                        audioContext={audioContext}
                        oscillator={oscillator}
                        attack={attack}
                        decay={decay}
                        sustain={sustain}
                        release={release}
                        distortion={distortion}/>
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
