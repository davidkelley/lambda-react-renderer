import React from 'react';
import { renderToString } from 'react-dom/server';
import { ServerRouter, createServerRenderContext } from 'react-router'

import App from '../../client/App';

import template from './views/template.hbs';

export default class Client {
  constructor(path) {
    this.path = path;
    this.assets = {};
    this.context = createServerRenderContext();
  }

  get renderedHtml() {
    const { path, context } = this;
    return renderToString(
      <ServerRouter location={path} context={context}>
        <App/>
      </ServerRouter>
    )
    // return rend  erToString(<RootComponent />);
  }

  get body() {
    const { assets, renderedHtml } = this;
    return template({ assets, renderedHtml });
  }

  render() {
    return new Promise((resolve) => {
      const { body, context } = this;
      const result = context.getResult();
      // if (context.redirect) {
      //   resolve({
      //     statusCode: 301,
      //     headers: {
      //       Location: result.redirect.pathname,
      //     },
      //   })
      // } else {
      //
      // }
      resolve({ statusCode: 200, body });
    });
  }
}
