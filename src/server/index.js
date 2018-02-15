const dotenv = require('dotenv');
const debug = require('debug')('ttm:Main');

// express stuff...
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

// load environment config
dotenv.load();

// import our routes
const routes = require('./routes');

// create our server
let server = express();

// disable some header stuff
server.disable('x-powered-by');

// use CORS
server.use(cors());
server.use(bodyParser());

// apply all middleware
Object.keys(routes).map(route => {
  server.use(`/${route}`, routes[route]);
});

// start server listening on given port
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => debug(` => listening on ${process.env.HOST}:${process.env.PORT}...`));
