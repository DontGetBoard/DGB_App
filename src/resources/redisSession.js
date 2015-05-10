'use strict';

var config = require('config');
var connectRedis = require('connect-redis');
var redisUrl = require('redis-url');

module.exports = function (session) {
  var RedisStore = connectRedis(session);
  var redisParsedUrl = redisUrl.parse(config.redisSession.url);

  var options = {
    host : redisParsedUrl.hostname,
    port : redisParsedUrl.port,
    pass : redisParsedUrl.password
  };

  return new RedisStore(options);
};
