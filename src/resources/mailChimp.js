'use strict';

var config = require('config');
var mcAPI  = require('mailchimp-api');
var mc     = new mcAPI.Mailchimp(config.mailChimp.key);

module.exports = mc;
