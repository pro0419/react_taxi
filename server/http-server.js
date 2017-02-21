import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from '../webpack.config';

import express from 'express';
import path from 'path';
import http from 'http';
import fs from 'fs-extra';

// Production bool
const isProduction = process.env.NODE_ENV === 'production';
const isDeveloping = !isProduction;
const port = isProduction ? (process.env.PORT || 80) : 3000;

export default function connect(app) {
  // Webpack dev server
  if (isDeveloping) {
    fs.copySync(path.resolve(__dirname,'../app/index.html'), path.resolve(__dirname,'../dist/index.html'));
    const WEBPACK_PORT = 3001;
    const compiler = webpack(webpackConfig);

    app.use(webpackMiddleware(compiler, {
      publicPath: webpackConfig.output.publicPath,
      stats: {
        colors: true,
        hash: false,
        timings: true,
        chunks: false,
        chunkModules: false,
        modules: false
      }
    }));
    app.use(webpackHotMiddleware(compiler));
    app.listen(WEBPACK_PORT, 'localhost', function (err, result) {
      if (err) {
        console.log(err);
      }

      console.log('WebpackDevServer listening at localhost:' + WEBPACK_PORT);
    });
  } else {
    // Production server

    const publicPath = path.resolve('./dist/');
    app.use(express.static(publicPath));

    const server = http.createServer(app);
    server.listen(port, function (err, result) {
      if (err) {
        console.log(err);
      }
      console.log('Production server running on port ' + port);
    });
  }
}

