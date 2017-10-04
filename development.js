const PORT = process.env.PORT || 2345;

const request = require('request-promise-native');
const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const express = require('express');

const config = require('./webpack.config');
const [client, server] = config;

client.entry.unshift('webpack-hot-middleware/client?name=client');
client.plugins.push(new webpack.HotModuleReplacementPlugin());

const app = express();
const basePath = `http://localhost:${PORT}`;
const compiler = webpack(client);

app.use(webpackMiddleware(compiler, { publicPath: `${basePath}/assets/`, noInfo: true, serverSideRender: true }));
app.use(webpackMiddleware(webpack(server), { publicPath: `${basePath}/__server/`, noInfo: true }));
app.use(webpackHotMiddleware(compiler));

const parseStats = (data) => {
  const { main } = data.assetsByChunkName;
  const assets = Array.isArray(main) ? main : [main];
  return {
    css: assets.filter(path => path.endsWith('.css')),
    js: assets.filter(path => path.endsWith('.js')),
  };
}

app.get('*', (req, res) => {
  /**
   * Request the Webpack transpiled Lambda application from localhost.
   * Evaluate the returned script to load the Render function.
   * This ensures that Express acts as a drop-in replacement for API Gateway
   * instead of superceeding the Lambda function entirely.
   */
  request(`${basePath}/__server/index.js`).then((data) => {
    const { Render } = eval(data);
    const { query, path } = req;
    const assets = parseStats(res.locals.webpackStats.toJson());
    Render({ queryStringParameters: query, path, assets }, null, (err, data) => {
      if (err) {
        res.send(err.stack);
      } else {
        const { statusCode, headers, body } = data;
        res.set(headers);
        res.status(statusCode).send(body);
      }
    });
  });
});

app.listen(PORT);
