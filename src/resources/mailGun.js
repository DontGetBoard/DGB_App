'use strict';

var mailgun         = require('mailgun-js')({
  apiKey: process.env.DGB_MAILGUN_API_KEY,
  domain: process.env.DGB_MAILGUN_DOMAIN
});

module.exports = mailgun;
