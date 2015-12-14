import React, {Component, PropTypes} from 'react';
import classNames from 'classnames';
import _ from 'lodash';

class Grid extends Component {

  handleCellSelect(i, j) {
    this.props.actions.selectGridCell(i,j);
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
      </div>
    );
  }
}

Grid.propTypes = {
  actions: PropTypes.object.isRequired,
  grid: PropTypes.array.isRequired
};

export default Grid;
