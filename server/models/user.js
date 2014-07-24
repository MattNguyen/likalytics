'use strict';

var bookshelf = require('./base');
var Photos = require('./photo');
var Likes = require('./like');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');

// Token
var secretKey = 'kjsdfa92jefw003fj209jf293';

module.exports = bookshelf.extend({

  tableName: 'users',

  initialize: function() {
    var unsignedParams = { session_key: this.session_key, access_token: this.access_token };

    if (!this.get('session_key')) {
      this.set('session_key', crypto.randomBytes(16).toString('hex'));
    }

    if (!this.get('session_token')) {
      this.set('session_token', jwt.sign(unsignedParams, secretKey));
    }

    return this;
  },

  photos: function() {
    return this.hasMany(Photos);
  },

  likes: function() {
    return this.hasMany(Likes);
  },
});
