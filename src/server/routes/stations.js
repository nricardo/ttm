const Stations = require('express').Router();
const debug = require('debug')('ttm:Stations');

// import search lib
const Searchr = require('../lib/searchr');

// load data from external source
debug('reading external data from: "stations.json"...');
const data = require('../stations.json');

// create instance for our searches
const searchr = new Searchr('name');
searchr.load(data);

/**
 * Routing for `/stations`.
 *
 * HTTP methods:
 *  - GET: lists all stations available (supports pagination);
 *  - POST: adds new station data (name, location, etc...);
 *
 * It provides also a search endpoint that accepts a `query`
 * parameter. Outputs a list (array) of stations (objects) that matches the
 * string passed (case-insensitive).
 */

Stations.get('/', (req, res, next) => {
  res.send('<h1>Just a bunch of train stations listing...</h1>');
});

Stations.post('/search', async (req, res, next) => {
  let query = req.body.query || '';
  let matches = await searchr.find(query);
  res.json(matches);
});

module.exports = Stations;
