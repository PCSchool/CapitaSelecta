
'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var KweetSchema = new Schema({
    message: {
      type: String,
      required: 'message of the kweet'
    },
    created_date: {
      type: Date,
      default: Date.now
    },
    username: {
      type: String,
      required: 'name of creator'
    },
    user_id: {
      type: Schema.Types.ObjectId, 
      ref: 'User',
      required: 'id of creator'
    }
  });
  
  module.exports = mongoose.model('Kweet', KweetSchema);