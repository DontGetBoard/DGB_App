var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Game = mongoose.model('Game');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

/* GET Games JSON. */
router.get('/games', function(req, res, next) {
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

/* GET Post by ID JSON. */
router.get('/games/:game', function(req, res) {
  //req.post.populate('comments', function(err, post) {
    res.json(req.game);
  //});
});

module.exports = router;
