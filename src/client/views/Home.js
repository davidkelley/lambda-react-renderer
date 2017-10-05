import React, { Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import s from './Home.css';

class Home extends Component {
  render() {
    return (
      <div className={s.home}>
        <h1>
          Home
        </h1>
      </div>
    );
  }
}

export default withStyles(s)(Home);
