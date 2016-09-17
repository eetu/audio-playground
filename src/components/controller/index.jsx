import React, {PropTypes, Component} from 'react';
import Oscillator from '../oscillator';
import RadioField from '../input/radio-field';
import RangeSlider from '../input/range-slider';
import FlipSwitch from '../input/flip-switch';
import SliderController from '../input/slide-controller';

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

  handleDetuneChange(value) {
    this.props.actions.changeDetune(parseFloat(value));
  }

  handleMixChange(value) {
    this.props.actions.changeMix(parseFloat(value));
  }

  handleMonoPolyChange(value) {
    this.props.actions.setPoly(value);
  }

  render() {
    const {oscillators, actions, attack, waveType, glide,
           decay, sustain, release, distortion, detune, mix, poly, node} = this.props;

    return (
      <div className='controller'>
        <div>
          <div className='controller__wave-type'>
            <FlipSwitch text='poly' onText='on' offText='off' onChange={this.handleMonoPolyChange.bind(this)} checked={poly}/>
            <RadioField text='sine' onChange={this.handleTypeChange.bind(this)}/>
            <RadioField text='square' onChange={this.handleTypeChange.bind(this)}/>
            <RadioField text='sawtooth' onChange={this.handleTypeChange.bind(this)}/>
            <RadioField text='triangle' onChange={this.handleTypeChange.bind(this)}/>
            <RadioField text='super saw' onChange={this.handleTypeChange.bind(this)} checked/>
          </div>
          {
            waveType === 'super saw' ?
              <div className='controller__super-saw'>
                 <RangeSlider min={0} max={1} step={0.1} value={detune} label='detune' onChange={this.handleDetuneChange.bind(this)} />
                 <RangeSlider min={0} max={1} step={0.1} value={mix} label='mix' onChange={this.handleMixChange.bind(this)} />
              </div> : ''
          }
          <div className='controller__adsr'>
            <RangeSlider min={0} max={1} step={0.01} value={attack} label='att' onChange={this.handleAttackChange.bind(this)} />
            <RangeSlider min={0} max={1} step={0.01} value={decay} label='dec' onChange={this.handleDecayChange.bind(this)} />
            <RangeSlider min={0} max={1} step={0.01} value={sustain} label='sus' onChange={this.handleSustainChange.bind(this)} />
            <RangeSlider min={0} max={1} step={0.01} value={release} label='rel' onChange={this.handleReleaseChange.bind(this)} />
          </div>
          <div className='controller__distortion'>
             <RangeSlider min={0} max={100} step={1} value={distortion} label='dist' onChange={this.handleDistortionChange.bind(this)} />
          </div>
          {
            !poly && <SliderController value={glide} action='glide' actions={actions}/>
          }

          {oscillators.map(oscillator =>
            <Oscillator key={oscillator.id}
                        actions={actions}
                        oscillator={oscillator}
                        outputNode={node}
                        {...this.props}/>
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
