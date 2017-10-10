const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const StatsWriterPlugin = require('webpack-stats-plugin').StatsWriterPlugin;

const transformStats = (data) => {
  const { main } = data.assetsByChunkName;
  const assets = Array.isArray(main) ? main : [main];
  return JSON.stringify({
    js: assets.filter(path => path.endsWith('.js')),
    css: assets.filter(path => path.endsWith('.css')),
  }, null, 2);
};

module.exports = [
  {
    name: 'client',
    entry: [
      './src/client',
    ],
    output: {
      path: `${__dirname}/out/client`,
      filename: 'app.[hash].js',
      publicPath: '/assets/',
    },
    plugins: [
      new webpack.optimize.OccurrenceOrderPlugin(),
      new StatsWriterPlugin({
        filename: '../server/stats.json',
        transform: transformStats,
      }),
      new UglifyJSPlugin(),
    ],
    module: {
      loaders: [
        {
          test: /\.js$/,
          loader: ['babel-loader'],
          include: `${__dirname}/src`,
        },
      ],
    },
  },
  {
    name: 'server',
    entry: [
      './handler.js',
    ],
    target: 'node',
    node: {
      __dirname: false,
    },
    externals: {
      'aws-sdk': 'aws-sdk',
    },
    output: {
      libraryTarget: 'commonjs2',
      path: `${__dirname}/out/server`,
      filename: 'index.js',
      publicPath: '/assets/',
    },
    module: {
      loaders: [
        {
          test: /\.js$/,
          loader: ['babel-loader'],
          exclude: /node_modules/,
        },
      ],
    },
  },
];
