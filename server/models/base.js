var dbConfig = require('../config/database');
var knex = require('knex')(dbConfig.knex);
var bookshelf = require('bookshelf')(knex);

module.exports = bookshelf.Model.extend({
  hasTimestamps: true
});
