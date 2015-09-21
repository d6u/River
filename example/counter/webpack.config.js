'use strict';

var path = require('path');

module.exports = {
  entry: path.join(__dirname, 'index.js'),
  output: {
    filename: 'bundle.js',
    path: __dirname,
  },
  devtool: 'source-map',

  module: {
    loaders: [
      {
        test: /\.js?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel'
      }
    ]
  }
};
