'use strict';

var mongoose = require('mongoose');

var GameSchema = new mongoose.Schema({
  title: String,
  picture: String,
  type: String,
  time: {type: Number, default: 0},
  min_players: {type: Number, default: 0},
  max_players: {type: Number, default: 0},
  can_bring_to_night: {type: Number, default: 0},
  details: {
    large_pictures: [{ src: String }],
    description: String
  },
  upvotes: {type: Number, default: 0},
  downvotes: {type: Number, default: 0}
  //comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }]
});

mongoose.model('Game', GameSchema);
