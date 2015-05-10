'use strict';

var LocalStrategy   = require('passport-local').Strategy;

var config = require('config');

var mailGun = require('../src/resources/mailGun');
var mc      = require('../src/resources/mailChimp');

var mongoose = require('mongoose');
var User     = mongoose.model('User');

module.exports = function (passport, gravatar) {

  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });

  passport.use('local-signup', new LocalStrategy({
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true
  }, function (req, email, password, done) {

    process.nextTick(function () {

      User.findOne({ 'local.email' :  email }, function (err, user) {
        if (err) {

          return done(err);
        }

        if (user) {

          return done(
            null,
            false,
            req.flash('signupMessage', 'That email is already taken.')
          );
        } else {

          var newUser            = new User();

          newUser.avatar         = gravatar.imageUrl(email);
          newUser.local.email    = email;
          newUser.local.password = newUser.generateHash(password);
          newUser.local.username = req.body.username;

          newUser.save(function (err) {
            if (err) {

              return done(err);
            }

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
                id: config.mailChimp.listId,
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
  }, function (req, email, password, done) {

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

