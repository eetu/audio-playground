import React, {Component, PropTypes} from 'react';
import classNames from 'classnames';
import _ from 'lodash';
import Scheduler from '../../lib/scheduler';

class Grid extends Component {
  constructor(props, context) {
    super(props, context);
    this.scheduler = new Scheduler(this.props.audioContext);
    this.scheduler.on('play', (time) => {
      console.log("time", time);
      this.props.actions.playNote('C5', time, time + 0.05);
    });
  }

  handleCellSelect(i, j) {
    this.props.actions.selectGridCell(i,j);
  }

  handleStopSequencer() {
    this.scheduler.stop();
  }

  handleStartSequencer() {
    this.scheduler.start();
  }

  render() {
    const {grid, actions} = this.props;
    return (
      <div className='grid'>
        <table>
          <tbody>
            { grid.map((row, i) =>
              <tr className='grid__row' key={i}>
                {row.map((column, j) => {
                  const cellClass = classNames({
                    'grid__cell': true,
                    'grid__cell--active': column
                  });
                  return <td className={cellClass} onClick={this.handleCellSelect.bind(this, i, j)} key={j}></td>
                }
                )}
              </tr>
            )}
          </tbody>
        </table>
        <button onClick={this.handleStartSequencer.bind(this)}>start</button>
        <button onClick={this.handleStopSequencer.bind(this)}>stop</button>
      </div>
    );
  }
}

Grid.propTypes = {
  actions: PropTypes.object.isRequired,
  audioContext: PropTypes.object.isRequired,
  grid: PropTypes.array.isRequired
};

export default Grid;
