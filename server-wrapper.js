process.env.NODE_ENV = 'production';
process.env.PORT = 80;

require("babel-register");

require('./server.js');

