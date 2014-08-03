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

  defaults: {
    sessionKey: crypto.randomBytes(16).toString('hex')
  },

  initialize: function() {
    this.on('creating', this.setSessionToken);
  },

  photos: function() {
    return this.hasMany(Photos);
  },

  likes: function() {
    return this.hasMany(Likes);
  },

  setSessionToken: function() {
    if (this.get('fid') && this.get('sessionKey')) {
      this.set('sessionToken', jwt.sign(this.pick('fid', 'sessionKey'), secretKey));
    }
  }
});
