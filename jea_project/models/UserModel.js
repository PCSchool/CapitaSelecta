
'use strict';
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    username: {
      type: String,
      required: 'username of user',
      unique: true
    },
    name: {
      type: String,
      required: 'name of user'
    },
    password: {
      type: String,
      required: 'password of user'
    },
    email: {
      type: String,
      required: 'email of user',
      unique: true
    },
    biography: {
      type: String,
      default: ""
    },
    website: {
      type: String,
      default: ""
    },
    location: {
      type: String,
      default: ""
    },
    created_date: {
      type: Date,
      default: Date.now
    },
    status: {
      type: [{
        type: String,
        enum: ['ADMINISTRATOR', 'MODERATOR', 'STANDARD']
      }],
      default: ['STANDARD']
    },
    followings: [{type: Schema.Types.ObjectId, ref: 'User'}],
    followers: [{type: Schema.Types.ObjectId, ref: 'User'}],
    kweets: [{type: Schema.Types.ObjectId, ref: 'Kweet'}]
  });
  
  UserSchema.pre('save', function(next) {
    var user = this;
    bcrypt.hash(user.password, 10, function(err, hash) {
      if(err)
        return next(err);
      user.password = hash;
      next();
      })
  });

  module.exports = mongoose.model('User', UserSchema);