const PORT = process.env.PORT || 2345;

const request = require('request-promise-native');
const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');
// const webpackHotMiddleware = require('webpack-hot-middleware');
const express = require('express');

const app = express();
const basePath = `http://localhost:${PORT}`;
const client = webpack(require('./webpack.client.config'));
const server = webpack(require('./webpack.server.config'));

app.use(webpackMiddleware(client, { publicPath: `${basePath}/assets/` }));
app.use(webpackMiddleware(server, { publicPath: `${basePath}/__server/`, noInfo: true }));
// app.use(webpackHotMiddleware(client));

app.get('*', (req, res) => {
  request(`${basePath}/__server/index.js`).then((data) => {
    const { Render } = eval(data);
    const { query, path } = req;
    Render({ queryStringParameters: query, path }, null, (err, data) => {
      if (err) {
        res.send(err);
      } else {
        const { statusCode, headers, body } = data;
        res.set(headers);
        res.status(statusCode).send(body);
      }
    });
  });
});

app.listen(PORT);
