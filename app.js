require('newrelic');

var express         = require('express');
var path            = require('path');
var favicon         = require('serve-favicon');
var logger          = require('morgan');
var cookieParser    = require('cookie-parser');
var bodyParser      = require('body-parser');
var mongoose        = require('mongoose');
var passport        = require('passport');
var flash           = require('connect-flash');
var session         = require('express-session');
var mailgun         = require('mailgun-js')({apiKey: process.env.DGB_MAILGUN_API_KEY, domain: process.env.DGB_MAILGUN_DOMAIN});
var mcAPI           = require('mailchimp-api');
var mc              = new mcAPI.Mailchimp(process.env.DGB_MAILCHIMP_API_KEY);
var gravatar        = require('nodejs-gravatar');

// All MongoDB Related Stuff
var app = express();

if (app.get('env') === 'development') {
    mongoose.connect('mongodb://localhost/dontgetboard');
}else{
    mongo_url = process.env.OPENSHIFT_MONGODB_DB_URL;
    mongo_app_name = process.env.OPENSHIFT_APP_NAME;
    mongoose.connect(mongo_url+mongo_app_name);
}
require('./models/Games');
require('./models/Users');

require('./config/passport')(passport,mailgun,mc,gravatar); // pass passport for configuration

var routes = require('./routes/index');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

console.log(process.env);

// required for passport
app.use(session({ secret: process.env.DGB_PASSPORT_SECRET })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;