import React from 'react';
import PropTypes from 'prop-types';
import { css, withStyles } from '../withStyles';
import s from './styles';

const Home = ({ styles }) => (
  <div>
    <h1 {...css(styles.title)}>
      Home
    </h1>
  </div>
);

Home.propTypes = {
  styles: PropTypes.object.isRequired,
};

export default withStyles(s)(Home);
