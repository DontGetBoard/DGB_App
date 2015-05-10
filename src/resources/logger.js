'use strict';

var logentries  = require('le_node');
var config      = require('config');
var bunyan      = require('bunyan');

var LOGGER_NAME = config.loggerName;

var ENV = process.env.NODE_ENV;

if (ENV === 'production') {
  module.exports = logentries.logger({
    token: config.logEntries.token
  });
} else {
  module.exports  = bunyan.createLogger({
    name: LOGGER_NAME,
    serializers: {
      error: bunyan.stdSerializers.err
    }
  });
}




