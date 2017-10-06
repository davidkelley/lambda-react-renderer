import React, { Component } from 'react';

import { css, withStyles } from '../../withStyles';
import styles from './styles';

class Todos extends Component {
  render() {
    return (
      <div>
        <h1 {...css(this.props.styles.title)}>
          Todos
        </h1>
      </div>
    );
  }
}

export default withStyles(styles)(Todos);
