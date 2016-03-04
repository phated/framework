'use strict';

var getConfig = require('hjs-webpack');

module.exports = getConfig({
  in: './example.js',
  out: './'
});
