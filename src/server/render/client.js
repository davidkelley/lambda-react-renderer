import React from 'react';
import { Helmet } from 'react-helmet';
import { renderToString } from 'react-dom/server';
import { StaticRouter as Router } from 'react-router';

import { App, WithStyles } from '../../client/App';

import template from './template';

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

  get head() {
    return Helmet.renderStatic();
  }

  get body() {
    const { assets, renderedHtml, css, head } = this;
    return template({ assets, renderedHtml, css, head });
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
