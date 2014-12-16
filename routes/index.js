var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var passport = require('passport');
var User = mongoose.model('User');
var Game = mongoose.model('Game');

var avatar;

/* GET home page. */
router.get('/', function(req, res) {
  if(req.isAuthenticated()){
    avatar = req.flash('userAvatar');
    res.render('index', {authenticated: 1, user: req.user, avatar: avatar }); 
  } else {
    res.render('index', {authenticated: 0 }); 
  }
  
});

/* GET profile page. */
router.get('/profile', isLoggedIn, function(req, res) {
  res.render('profile', {user: req.user, avatar: avatar});
});

/* GET games page. */
router.get('/games', isLoggedIn, function(req, res) {
  res.render('games');
});

/* GET nights page. */
router.get('/nights', isLoggedIn, function(req, res) {
  res.render('nights');
});


//
// Login Routes
//

// GET login page
router.get('/login', function(req, res) {
  // render the page and pass in any flash data if it exists
  res.render('login.ejs', { message: req.flash('loginMessage') }); 
});

// POST login form
router.post('/login', passport.authenticate('local-login', {
    successRedirect : '/',
    failureRedirect : '/#/login',
    failureFlash : true
}));

// GET Signup page
router.get('/signup', function(req, res) {
    // render the page and pass in any flash data if it exists
    res.render('signup.ejs', { message: req.flash('signupMessage') });
});

// POST Signup form
router.post('/signup', passport.authenticate('local-signup', {
    successRedirect : '/',
    failureRedirect : '/#/signup',
    failureFlash : true
}));

// GET Logout
router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});


//
// API
//

/* GET Games JSON. */
router.get('/api/games', function(req, res, next) {
  Game.find(function(err, games){
    if(err){ return next(err); }

    res.json(games);
  });
});

/* Query Game by ID. */
router.param('game', function(req, res, next, id) {
  var query = Game.findById(id);

  query.exec(function (err, game){
    if (err) { return next(err); }
    if (!game) { return next(new Error("can't find post")); }

    req.game = game;
    return next();
  });
});

/* GET Game by ID JSON. */
router.get('/api/games/:game', function(req, res) {
  //req.post.populate('comments', function(err, post) {
    res.json(req.game);
  //});
});

// Function to check if a user is loggedIn
function isLoggedIn(req, res, next) {

  // if user is authenticated in the session, continue to next script 
  if (req.isAuthenticated())
      return next();

  // if he's not, redirect him to the home page
  res.render('login', { message: "Please login to access this area!" });

}

module.exports = router;
