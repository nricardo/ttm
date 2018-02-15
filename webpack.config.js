'use strict';

const path = require('path');
const webpack = require('webpack');

// -- external webpack plugins
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
//const CompressionPlugin = require('compression-webpack-plugin');

// -- internal webpack plugins
const DefinePlugin = webpack.DefinePlugin;
const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
const AggressiveMergingPlugin = webpack.optimize.AggressiveMergingPlugin;
const ContextReplacementPlugin = webpack.ContextReplacementPlugin;

module.exports = {
  // define the tool used
  // on development to aid debugging
  devtool: 'source-map',

  // entry point
  entry: {
    ttm: 'app/ttm.js',
  },

  // output definition
  output: {
    filename: '[name].[hash].js',
    path: path.join(__dirname, 'dist/app/')
  },

  // plugins
  plugins: [
    new CopyWebpackPlugin([
      { from: 'src/app/assets', to: 'assets' },
    ]),

    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/app/index.html'
    }),

/*
    new UglifyJsPlugin({
      sourceMap: true,
      mangle: { keep_fnames: true }
    }),

    new AggressiveMergingPlugin(),

    new CompressionPlugin({
      asset: "[path].gz[query]",
      algorithm: "gzip",
      test: /\.(js|css|html)$/,
      threshold: 10240, // compress assets > 10KB
      minRatio: 0.8 // with 80% compression ratio
    })
*/
  ],

  // loaders definitions
  module: {
    rules: [
      // transpiles ES6
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },

      // process SASS/SCSS files and loads them
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
        exclude: /node_modules/
      },

      // loads HTML templates
      {
        test: /\.html$/,
        loader: 'html-loader',
        exclude: /node_modules/
      },

      // loads external fonts
      {
        test: /\.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        loader: 'file-loader?name=fonts/[name].[ext]'
      }
    ]
  },

  // resolvers definitions
  resolve: {
    extensions: ['.js'],
    modules: [path.join(__dirname, 'src'), 'node_modules']
  }
}
