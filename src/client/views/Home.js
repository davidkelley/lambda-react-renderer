import React, { Component } from 'react';
import { css, withStyles } from '../withStyles';
import styles from './styles';

class Home extends Component {
  render() {
    return (
      <div>
        <h1 {...css(this.props.styles.title)}>
          Home
        </h1>
      </div>
    );
  }
}

export default withStyles(styles)(Home);
