const webpack = require('webpack');

const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  devtool: 'source-map',
  entry: [
    './src/client',
  ],
  output: {
    path: `${__dirname}/out/client`,
    filename: 'app.bundle.js',
    // chunkFilename: '[id].[hash].bundle.js',
    publicPath: '/assets/[hash]'
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.DefinePlugin({
      // 'process.env': {
      //   'NODE_ENV': JSON.stringify('production')
      // }
    }),
    new UglifyJSPlugin()
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
};
