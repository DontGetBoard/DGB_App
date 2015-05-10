'use strict';

var config = require('config');
var mailgun         = require('mailgun-js')({
  apiKey: config.mailGun.key,
  domain: config.mailGun.domain
});

module.exports = mailgun;
