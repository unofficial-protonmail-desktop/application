const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const env = process.env.NAME;

module.exports = {
  devtool: env === 'production' ? false : 'source-map',
  target: 'electron-renderer',

  entry: [
    path.join(__dirname, '../src/renderer/index.js'),
  ],

  output: {
    path: path.join(__dirname, '../app'),
    filename: 'renderer.js',
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
      {
        test: /\.png$/,
        use: {
          loader: 'url-loader',
        },
      },
    ],
  },

  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '../src/renderer/index.html'),
    }),
  ],
};
