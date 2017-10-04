import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter as Router } from 'react-router';

import { App, WithStyles } from '../../client/App';

import template from './views/template.hbs';

export default class Client {
  constructor({ path, assets }) {
    this.path = path;
    this.assets = assets;
    this.css = [];
    this.context = {};
  }

  get renderedHtml() {
    return renderToString(
      <WithStyles onInsertCss={styles => this.css.push(styles._getCss())}>
        <Router location={this.path} context={this.context}>
          <App/>
        </Router>
      </WithStyles>
    )
  }

  get body() {
    const { assets, renderedHtml, css } = this;
    return template({ assets, renderedHtml, css });
  }

  async render() {
    const { context, body } = this;
    if (context.url) {
      return {
        statusCode: 301,
        headers: {
          Location: context.url,
        },
      };
    } else {
      const { statusCode } = context;
      const code = statusCode || 200;
      const headers = {
        'Content-Type': 'text/html',
        'Cache-Control': 'max-age=300, public',
      };
      return { statusCode: code, body, headers };
    }
  }
}
