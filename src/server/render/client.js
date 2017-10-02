// import path from 'path';
// import fs from 'fs';
import React from 'react';
import { renderToString } from 'react-dom/server';

import RootComponent from '../../client';

import template from './views/template.hbs';

export default class Client {
  constructor(path) {
    this.path = path;
    this.assets = {};
  }

  get renderedHtml() {
    return renderToString(<RootComponent />);
  }

  get body() {
    const { assets, renderedHtml } = this;
    return template({ assets, renderedHtml });
  }

  render() {
    return new Promise((resolve) => {
      const { body } = this;
      resolve({ statusCode: 200, body });
    });
  }
}
