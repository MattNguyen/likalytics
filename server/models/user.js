var bookshelf = require('./base');

module.exports = bookshelf.extend({

  tableName: 'users',

  photos: function() {
    return this.hasMany(Photos);
  },

  likes: function() {
    return this.hasMany(Likes);
  },
});
