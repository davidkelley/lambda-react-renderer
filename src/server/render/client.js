import React from 'react';
import { Map } from 'immutable';
import { Provider } from 'react-redux'
import { Helmet } from 'react-helmet';
import { renderToString } from 'react-dom/server';
import { StyleSheetServer } from 'aphrodite';
import { StaticRouter as Router } from 'react-router';

import { App } from '../../client/App';
import { configureStore } from '../../client/store';
import template from './template';

export default class Client {
  constructor({ location = '/', assets, params = {} }) {
    this.store = configureStore(Map(params));
    this.location = location;
    this.assets = assets;
  }

  async rendered() {
    const { location, store } = this;
    const { html, css } = StyleSheetServer.renderStatic(() => renderToString(
      <Provider store={store}>
        <Router location={location}>
          <App/>
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
