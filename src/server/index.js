"use strict";

import express from 'express';
import minimist from 'minimist';
import proxy from '../lambda/proxy';

const app = express();
const argv = minimist(process.argv.slice(2));
const host = argv.host || process.env.HOST || null;
const port = argv.port || process.env.PORT || 3000;

const toQueryString = (query) => {
  return Object.keys(query).map((key) => {
    return `${key}=${query[key]}`;
  }).join('&');
}

app.listen(port, host, (err) => {
  app.get('*', (req, res) => {
    const { path, query } = req;
    const queryStringParameters = toQueryString(query);
    const event = { path, queryStringParameters };

    proxy(event, {}, (err, data) => {
      if (err) {
        res.status(500).send(err.toString());
        console.trace(err);
      } else {
        res.set(data.headers);
        res.status(data.statusCode);
        res.send(data.body);
      }
    })
  })
});
