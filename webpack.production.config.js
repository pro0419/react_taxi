'use strict';

var path = require('path');
var webpack = require('webpack');
var StatsPlugin = require('stats-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: [
    'babel-polyfill',
    './app/js/main.js'
  ],
  devServer: {
    hot: true,
    inline: true
  },
  output: {
    path: path.join(__dirname, 'dist/'),
    filename: 'bundle.js'
  },
  plugins: [
    new CopyWebpackPlugin(
    [
      { from: './app/index.prod.html', to: './index.html' },
      { from: './app/images', to: './images' },
    ],  
    {
      copyUnmodified: true
    }),
    new ExtractTextPlugin('style.css', { allChunks: true }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false,
        screw_ie8: true
      }
    }),
    new StatsPlugin('webpack.stats.json', {
      source: false,
      modules: false
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
  ],
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    noParse: [/aws-sdk.js/],
    loaders: [
    {
      test: /\.js(x|)?$/,
        loader: ["babel-loader"],
        include: path.resolve(__dirname, 'app/'),
        query: {
          presets: ['es2015', 'react', 'stage-0']
        }
      }, 
      {
        test: /\.json?$/,
        loader: 'json'
      },
      { 
        test: /\.css$/,  
        loader: "style!css?modules&sourceMap&localIdentName=[local]___[hash:base64:5]!resolve-url!sass?outputStyle=expanded&sourceMap" },
      { 
        test: /\.less$/, 
        loader: "style-loader!css-loader!less-loader" 
      },
      { 
        test: /\.gif$/,
        loader: "url-loader?mimetype=image/png" },
      { 
        test: /\.woff(2)?(\?v=[0-9].[0-9].[0-9])?$/, 
        loader: "url-loader?mimetype=application/font-woff" },
      { 
        test: /\.(ttf|eot|svg)(\?v=[0-9].[0-9].[0-9])?$/, 
        loader: "file-loader?name=[name].[ext]" },
      {
        test: /\.scss$/,
        loaders: ['style', 'css', 'sass'],
        include: path.resolve(__dirname, 'app/')
      },
      { test: /\.(jpe?g|png|gif|svg)$/, 
        loader: 'url', 
        query: {limit: 10240} 
      }
    ]
  }
};