import React, { PureComponent } from 'react';
import data from '../../../data';

import Cloud from '../../../components/Cloud';

export default class extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <Cloud data={data}/>
    );
  }
}
