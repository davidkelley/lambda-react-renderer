module.exports = {
  entry: [
    'babel-polyfill',
    './handler.js',
  ],
  target: 'node',
  externals: {
    'aws-sdk': 'aws-sdk',
  },
  output: {
    libraryTarget: 'commonjs2',
    path: `${__dirname}/out`,
    filename: 'index.js',
  },
  module: {
    loaders: [
      {
        test: /\.hbs$/,
        loader: 'handlebars-loader',
      },
      {
        test: /\.js$/,
        loader: ['babel-loader'],
        exclude: /node_modules/,
      },
    ],
  },
};
