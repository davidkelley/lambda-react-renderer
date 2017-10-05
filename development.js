const PORT = process.env.PORT || 2345;

import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import express from 'express';

import { Render } from './handler';
import config from './webpack.config';
const [client] = config;

client.entry.unshift('webpack-hot-middleware/client');
client.plugins.push(new webpack.HotModuleReplacementPlugin());

const app = express();
const basePath = `http://localhost:${PORT}`;
const compiler = webpack(client);

app.use(webpackMiddleware(compiler, { publicPath: `${basePath}/assets/`, noInfo: true, serverSideRender: true }));
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

app.listen(PORT);
