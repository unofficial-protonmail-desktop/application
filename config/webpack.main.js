const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  devtool: 'source-map',
  target: 'electron-main',
  mode: process.env.NAME,
  entry: path.join(__dirname, '../src/main/index.js'),

  output: {
    path: path.join(__dirname, '../app'),
    filename: 'background.js',
  },

  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.join(__dirname, '../src/main/images'),
          to: path.join(__dirname, '../app/images'),
        },
      ],
    }),
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
