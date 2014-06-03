'use strict';

var path = require('path');

var rootPath = path.normalize(__dirname + '/../../..');

module.exports = {
  root: rootPath,
  ip: '127.0.0.1',
  port: process.env.PORT || 8000
};