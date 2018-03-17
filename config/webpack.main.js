const path = require('path');
const webpack = require('webpack');

module.exports = {
  devtool: 'source-map',
  target: 'electron-main',
  entry: path.join(__dirname, '../src/background.js'),

  output: {
    path: path.join(__dirname, '../app'),
    filename: 'background.js',
  },

  plugins: [
    new webpack.EnvironmentPlugin({
//      NODE_ENV: 'production',
//      NAME: 'production',
    }),
  ],

  node: {
    __dirname: false,
    __filename: false,
  },
};
