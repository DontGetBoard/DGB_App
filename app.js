'use strict';

require('newrelic');

var express         = require('express');
var config          = require('config');
var path            = require('path');
var favicon         = require('serve-favicon');
var logger          = require('./src/resources/logger');
var cookieParser    = require('cookie-parser');
var bodyParser      = require('body-parser');
var passport        = require('passport');
var flash           = require('connect-flash');
var session         = require('express-session');
var gravatar        = require('nodejs-gravatar');

var herokuAwake     = require('./src/resources/herokuAwake');
var redisSession    = require('./src/resources/redisSession');

// All MongoDB Related Stuff
var app = express();

// Init DB and Models
require('./src/resources/mongooseInit')();

require('./config/passport')(passport, gravatar);

var routes = require('./src/routes/index');

// view engine setup
app.set('views', path.join(__dirname, 'src/views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'src/public')));

redisSession(session);

// required for passport
app.use(session({ secret : config.session.secret }));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use('/', routes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

/*
  Server
 */
var http = app.listen(config.httpPort, function () {
  var port = http.address().port;
  logger.info({
    port: port,
    state: 'http server started!'
  });
});

herokuAwake('dont-get-board');
