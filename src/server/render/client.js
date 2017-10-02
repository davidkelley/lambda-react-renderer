import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter as Router } from 'react-router';
// import createServerRenderContext from 'react-router/createServerRenderContext';

import App from '../../client/App';

import template from './views/template.hbs';

export default class Client {
  constructor(path) {
    this.path = '/aboadadadadaut';
    // this.path = path;
    this.assets = {};
    // this.context = createServerRenderContext();
    this.context = {};
  }

  get renderedHtml() {
    const { path, context } = this;
    return renderToString(
      <Router location={path} context={context}>
        <App/>
      </Router>
    )
  }

  get body() {
    const { assets, renderedHtml } = this;
    return template({ assets, renderedHtml });
  }

  render() {
    return new Promise((resolve) => {
      const { context, body } = this;
      if (context.url) {
        resolve({
          statusCode: 301,
          headers: {
            Location: context.url,
          },
        });
      } else {
        const { statusCode } = context;
        const code = statusCode || 200;
        resolve({ statusCode: code, body });
      }
    });
  }
}
