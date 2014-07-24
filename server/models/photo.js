'use strict';

var bookshelf = require('./base');

module.exports = bookshelf.extend({
  tableName: 'photos',

  likes: function() {
    return this.hasMany('likes');
  },

  user: function() {
    return this.hasOne('user');
  }
});
