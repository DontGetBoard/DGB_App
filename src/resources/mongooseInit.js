'use strict';

var mongoose = require('mongoose');
var config   = require('config');

module.exports = function () {
  mongoose.connect(config.mongoDb.uri);
};
