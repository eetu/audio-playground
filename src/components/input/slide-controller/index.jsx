import React, {PropTypes, Component} from 'react';
import RangeSlider from '../range-slider';
import _ from 'lodash';

class SliderController extends Component {
  handleValueChange(value) {
    this.props.actions['change' + _.capitalize(this.props.action)](parseFloat(value));
  }

  render() {
    const {value, label, action} = this.props;
    return (
      <RangeSlider min={0} max={1} step={0.01}
        value={value} label={label || action} onChange={this.handleValueChange.bind(this)} />
    );
  }
}

SliderController.propTypes = {
  actions: PropTypes.object.isRequired
};

export default SliderController;
