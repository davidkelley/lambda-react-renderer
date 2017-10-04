import React from 'react';
import { hydrate } from 'react-dom';
import { BrowserRouter as Router, browserHistory } from 'react-router-dom';
import { App, WithStyles } from './App';

hydrate(
  (
    <WithStyles onInsertCss={styles => styles._insertCss()}>
      <Router history={browserHistory}>
        <App/>
      </Router>
    </WithStyles>
  ),
  document.getElementById("app")
)
