'use strict';

var mongoose = require('mongoose');
var config   = require('config');

require('../models/Games');
require('../models/Users');

module.exports = function () {
  mongoose.connect(config.mongoDb.uri);
};
