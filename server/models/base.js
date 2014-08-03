'use strict';

var dbConfig = require('../config/database');
var knex = require('knex')(dbConfig[process.env.NODE_ENV]);
var bookshelf = require('bookshelf')(knex);
var _ = require('lodash');
_.str = require('underscore.string');

module.exports = bookshelf.Model.extend({
  hasTimestamps: true,

  format: function(attrs) {
    return _.reduce(attrs, function(memo, val, key) {
      memo[_.str.underscored(key)] = val;
      return memo;
    }, {});
  },

  parse: function(attrs) {
    return _.reduce(attrs, function(memo, val, key) {
      memo[_.str.camelize(key)] = val;
      return memo;
    }, {});
  }
});
