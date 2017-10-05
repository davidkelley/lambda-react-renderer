import React from 'react';
import { Helmet } from 'react-helmet';
import { renderToString } from 'react-dom/server';
import { StyleSheetServer } from 'aphrodite';
import { StaticRouter as Router } from 'react-router';

import { App } from '../../client/App';

import template from './template';

export default class Client {
  constructor({ path, assets }) {
    this.path = path;
    this.assets = assets;
    this.context = {};
  }

  get rendered() {
    return StyleSheetServer.renderStatic(() => {
      return renderToString(
        <Router location={this.path} context={this.context}>
          <App/>
        </Router>
      );
    });
  }

  // get renderedHtml() {
  //   return renderToString(
  //     <Router location={this.path} context={this.context}>
  //       <App/>
  //     </Router>
  //   )
  // }

  get head() {
    return Helmet.renderStatic();
  }

  get body() {
    const { html, css } = this.rendered;
    const { assets, head } = this;
    return template({ assets, html, css, head });
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
