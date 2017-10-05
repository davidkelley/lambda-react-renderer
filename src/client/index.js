import React from 'react';
import { StyleSheet } from 'aphrodite';
import { hydrate } from 'react-dom';
import { BrowserRouter as Router, browserHistory } from 'react-router-dom';
import { App } from './App';

// console.log(document.head.querySelector("[property=css]").content);

StyleSheet.rehydrate(
  JSON.parse(atob(document.head.querySelector("[property=css]").content))
);

hydrate(
  (
    <Router history={browserHistory}>
      <App/>
    </Router>
  ),
  document.getElementById("app")
)
