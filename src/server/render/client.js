import React from 'react';
import { Provider } from 'react-redux';
import { Helmet } from 'react-helmet';
import { renderToString } from 'react-dom/server';
import { StyleSheetServer } from 'aphrodite';
import { StaticRouter as Router } from 'react-router';

import { App } from '../../client/App';
import { configureStore } from '../../client/store';
import template from './template';

export default class Client {
  constructor({ location = '/', assets, params = {} }) {
    // const routing = { locationBeforeTransitions: location };
    this.store = configureStore({ ...params });
    this.location = location;
    this.assets = assets;
    this.context = {};
  }

  async rendered() {
    const { location, store, context } = this;
    const { html, css } = StyleSheetServer.renderStatic(() => renderToString(
      <Provider store={store}>
        <Router location={location} context={context}>
          <App />
        </Router>
      </Provider>
    ));
    return { html, css, state: store.getState() };
  }

  get head() {
    return Helmet.renderStatic();
  }

  async body() {
    const { html, css, state } = await this.rendered();
    const { assets, head } = this;
    return template({ assets, html, css, state, head });
  }

  async render() {
    const body = await this.body();
    const headers = {
      'Content-Type': 'text/html',
      'Cache-Control': 'max-age=300, public',
    };
    return { statusCode: 200, body, headers };
  }
}
