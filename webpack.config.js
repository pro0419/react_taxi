'use strict';

var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  devtool: 'eval-source-map',
  devServer: {
    hot: true,
    inline: true,
    outputPath: path.join(__dirname, 'dist'),
  },
  entry: [
    'babel-polyfill',
    'webpack-hot-middleware/client?reload=true',
    './app/js/main.js'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/dist/',
    filename: 'bundle.js',
  },
  plugins: [
    new ExtractTextPlugin('style.css', { allChunks: true }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({'process.env.NODE_ENV': JSON.stringify('development')
    })
  ],
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
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
        loader: "style!css?modules&sourceMap&localIdentName=[local]___[hash:base64:5]!resolve-url!sass?outputStyle=expanded&sourceMap" 
      },
      { 
        test: /\.less$/, 
        loader: "style-loader!css-loader!less-loader" 
      },
      { 
        test: /\.gif$/, 
        loader: "url-loader?mimetype=image/png" 
      },
      { 
        test: /\.woff(2)?(\?v=[0-9].[0-9].[0-9])?$/, 
        loader: "url-loader?mimetype=application/font-woff" 
      },
      { 
        test: /\.(ttf|eot|svg)(\?v=[0-9].[0-9].[0-9])?$/, 
        loader: "file-loader?name=[name].[ext]" 
      },
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