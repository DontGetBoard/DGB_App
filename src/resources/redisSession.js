'use strict';

var config = require('config');
var connectRedis = require('connect-redis');
var redisUrl = require('redis-url');

module.exports = function (session) {
  var RedisStore = connectRedis(session);
  var options = redisUrl.parse(config.redisSession.url);

  console.log(options);

  return new RedisStore(options);
};
