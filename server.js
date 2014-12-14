#!/usr/bin/env node
var debug = require('debug')('dontgetboard');
var app = require('./app');

// app.set('port', process.env.OPENSHIFT_NODEJS_PORT || 3000);

// var server = app.listen(app.get('port'), function() {
//   debug('Express server listening on port ' + server.address().port);
// });


// Start the server.
var port = process.env.OPENSHIFT_NODEJS_PORT || 8080,
 	ip   = process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1";
app.listen(port, ip);
