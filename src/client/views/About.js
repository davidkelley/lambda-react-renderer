import React, { Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import s from './About.css';

class About extends Component {
  render() {
    return (
      <div className={s.about}>
        <h1>
          About
        </h1>
      </div>
    );
  }
}

export default withStyles(s)(About);
