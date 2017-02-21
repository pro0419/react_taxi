import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, Link, hashHistory, browserHistory, useRouterHistory } from "react-router";
import { createHistory } from 'history'
import ClientIndex from './client/index.js';
import AdminIndex from './admin/index.js';

import "../css/main.scss";

require('script-loader!jquery/dist/jquery.js');
require('script-loader!hammerjs/hammer.js');
window.$ = window.jQuery = require('jquery');
window.moment = window.moment = require('moment');
require('script-loader!../js/admin/common/lib/bootstrap-material-datetimepicker/js/bootstrap-material-datetimepicker.js');
require('script-loader!materialize-css/dist/js/materialize.js');
require('file?name=[name].[ext]!../index.html');

const history = useRouterHistory(createHistory)({
  basename: '/'
})

ReactDOM.render((
    <Router history={browserHistory}>
      {AdminIndex()}
      {ClientIndex()}
    </Router>
  ), document.getElementById('app')
);
