const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { spawn } = require('child_process');

const env = process.env.NAME || 'development';

const outputPath = path.join(__dirname, '../app');

module.exports = [
  {
    devtool: 'source-map',
    target: 'electron-renderer',
    mode: env,
    entry: [
      path.join(__dirname, '../src/renderer/index.js'),
    ],

    output: {
      path: outputPath,
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
              options: {
                modules: true,
              },
            },
            {
              loader: 'sass-loader',
            },
          ],
        },
        {
          test: /\.svg$/,
          exclude: /node_modules/,
          use: {
            loader: 'file-loader',
          },
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
      new webpack.DefinePlugin({
        OUTPUT_DIR: JSON.stringify(outputPath),
      }),
      new webpack.NoEmitOnErrorsPlugin(),
      new HtmlWebpackPlugin({
        template: path.join(__dirname, '../src/renderer/index.html'),
      }),
    ],

    devServer: {
      headers: { 'Access-Control-Allow-Origin': '*' },
      lazy: false,
      compress: true,
      noInfo: true,
      stats: 'errors-only',
      inline: true,
      hot: true,
      historyApiFallback: {
        index: './app/index.html'
      },

      before() {
        // eslint-disable-next-line no-console
        console.log('Starting Main Process...');
        spawn('npm', ['run', 'start-main-dev'], {
          shell: true,
          env: process.env,
          stdio: 'inherit'
        })
          .on('close', code => process.exit(code))
          // eslint-disable-next-line no-console
          .on('error', spawnError => console.error(spawnError));

        console.log('Starting Webview Preload Process...');
        spawn('yarn', ['start', '--config-name webview-preload'], {
          shell: true,
          env: process.env,
          stdio: 'inherit'
        })
          .on('close', code => process.exit(code))
          // eslint-disable-next-line no-console
          .on('error', spawnError => console.error(spawnError));
      }
    },
  },
  {
    entry: path.join(__dirname, '../src/renderer/lib/webview-preload.js'),
    target: 'electron-renderer',
    name: 'webview-preload',
    devtool: 'cheap-module-source-map',
    mode: env,
    output: {
      path: outputPath,
      publicPath: '/',
      filename: 'webview-preload.js',
    },
    devServer: {
      hot: false,
      inline: false,
      writeToDisk: true,
    },
  },
];
