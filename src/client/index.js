import React from 'react';
import { Provider } from 'react-redux';
import { StyleSheet } from 'aphrodite';
import { hydrate } from 'react-dom';
import { Map } from 'immutable';
import { BrowserRouter as Router } from 'react-router-dom';
import { browserHistory } from 'react-router';

import { App } from './App';
import { configureStore } from './store';

const decode = (enc) => JSON.parse(atob(enc));

const state = Map(decode(document.head.querySelector("[property=state]").content));

const styles = decode(document.head.querySelector("[property=css]").content)

const store = configureStore(state);

StyleSheet.rehydrate(styles);

hydrate(
  (
    <Provider store={store}>
      <Router history={browserHistory}>
        <App/>
      </Router>
    </Provider>
  ),
  document.getElementById("app")
)
