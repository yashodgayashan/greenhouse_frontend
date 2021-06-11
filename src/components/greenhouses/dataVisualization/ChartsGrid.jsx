import React, { Component } from 'react';
import ResourceAPIs from '../../../utils/ResourceAPI';
import ChartRow from './ChartRow';

class ChartsGrid extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <ChartRow />
      </div>
    );
  }
}

export default ChartsGrid;