import React from 'react';
import { applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { StyleSheet } from 'aphrodite';
import { hydrate } from 'react-dom';
import { ConnectedRouter, routerMiddleware } from 'react-router-redux';
import { createBrowserHistory } from 'history';

import { App } from './App';
import { configureStore } from './store';

const decode = (enc) => JSON.parse(atob(enc));

const state = decode(document.head.querySelector('[property=state]').content);

const styles = decode(document.head.querySelector('[property=css]').content);

const history = createBrowserHistory();

const middleware = routerMiddleware(history);

const store = configureStore(state, applyMiddleware(middleware));

// const history = syncHistoryWithStore(createBrowserHistory(), store);

StyleSheet.rehydrate(styles);

hydrate(
  (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>
  ),
  document.getElementById('app')
);
