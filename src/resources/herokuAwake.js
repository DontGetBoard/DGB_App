'use strict';

var http = require('http');

module.exports = function (appname) {
  setInterval(function () {
    http.get('http://' + appname + '.herokuapp.com');
  }, 300000);
};
