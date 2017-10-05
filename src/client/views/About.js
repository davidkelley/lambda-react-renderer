import React, { Component } from 'react';
import { css, withStyles } from '../withStyles';
import styles from './styles';

class About extends Component {
  render() {
    return (
      <div>
        <h1 {...css(this.props.styles.otherTitle)}>
          About
        </h1>
      </div>
    );
  }
}

export default withStyles(styles)(About);
