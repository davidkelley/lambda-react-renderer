import React from 'react';
import PropTypes from 'prop-types';
import { css, withStyles } from '../../withStyles';
import s from './styles';

const Todos = ({ styles }) => (
  <div>
    <h1 {...css(styles.title)}>
      Todos
    </h1>
  </div>
);

Todos.propTypes = {
  styles: PropTypes.object.isRequired,
};

export default withStyles(s)(Todos);
