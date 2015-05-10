'use strict';

// load all the things we need
var LocalStrategy   = require('passport-local').Strategy;

// Resources
var mailGun = require('../src/resources/mailGun');

// load up the user model
var User            = require('../src/models/Users');

// expose this function to our app using module.exports
module.exports = function (passport, mc, gravatar) {

  // =========================================================================
  // passport session setup ==================================================
  // =========================================================================
  // required for persistent login sessions
  // passport needs ability to serialize and unserialize users out of session

  // used to serialize the user for the session
  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  // used to deserialize the user
  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });

  // =========================================================================
  // LOCAL SIGNUP ============================================================
  // =========================================================================
  passport.use('local-signup', new LocalStrategy({
      usernameField : 'email',
      passwordField : 'password',
      passReqToCallback : true
  },
  function (req, email, password, done) {

    // asynchronous
    // User.findOne wont fire unless data is sent back
    process.nextTick(function () {

      // find a user whose email is the same as the forms email
      // we are checking to see if the user trying to login already exists
      User.findOne({ 'local.email' :  email }, function (err, user) {
        // if there are any errors, return the error
        if (err) {

          return done(err);
        }

        // check to see if theres already a user with that email
        if (user) {

          return done(
            null,
            false,
            req.flash('signupMessage', 'That email is already taken.')
          );
        } else {

          // if there is no user with that email
          // create the user
          var newUser            = new User();

          // set the user's local credentials
          newUser.avatar         = gravatar.imageUrl(email);
          newUser.local.email    = email;
          newUser.local.password = newUser.generateHash(password);
          newUser.local.username = req.body.username;

          // save the user
          newUser.save(function (err) {
            if (err) {

              throw err;
            }

            // Sending Welcome Email
            var data = {
              from: 'Don\'t get board <no-reply@mg.dontgetboard.net>',
              to: email,
              subject: 'Hello',
              text: 'Welcome to DGB!'
            };

            mailGun.messages().send(data, function (error, body) {
              console.log(body);
              console.log(error);
            });

            // Subscribe to Newsletter
            var mcReq = {
                id: process.env.DGB_MAILCHIMP_LIST_ID,
                email: { email: email },
                merge_vars: {
                    UNAME: req.body.username
                }
            };

            // submit subscription request to Mailchimp
            mc.lists.subscribe(mcReq, function (data) {
              console.log(data);
            }, function (error) {
              console.log(error);
            });

            return done(null, newUser);
          });
        }

      });

    });

  }));

  // =========================================================================
  // LOCAL LOGIN =============================================================
  // =========================================================================
  passport.use('local-login', new LocalStrategy({
      usernameField : 'email',
      passwordField : 'password',
      passReqToCallback : true
  },
  function (req, email, password, done) {

    // find a user whose email is the same as the forms email
    // we are checking to see if the user trying to login already exists
    User.findOne({ 'local.email' :  email }, function (err, user) {
      // if there are any errors, return the error before anything else
      if (err) {

        return done(err);
      }

      // if no user is found, return the message
      if (!user) {

        return done(
          null,
          false,
          req.flash('loginMessage', 'No user found.')
        );
      }

      // if the user is found but the password is wrong
      if (!user.validPassword(password)) {

        return done(
          null,
          false,
          req.flash('loginMessage', 'Oops! Wrong password.')
        );
      }

      // all is well, return successful user
      return done(null, user);
    });

  }));

  // =========================================================================
  // LOCAL Forgot Password ===================================================
  // =========================================================================
  passport.use('local-forgot', new LocalStrategy({
      usernameField : 'email',
      passwordField : 'password',
      passReqToCallback : true
  },
  function (req, email, password, done) {

    // find a user whose email is the same as the forms email
    // we are checking to see if the user trying to login already exists
    User.findOne({ 'local.email' :  email }, function (err, user) {
      // if there are any errors, return the error before anything else
      if (err) {
        return done(err);
      }

      // if no user is found, return the message
      if (!user) {
        return done(
          null,
          false,
          req.flash('forgotMessage', 'No user found.')
        );
      }

      return done(null, user);
    });

  }));

};

