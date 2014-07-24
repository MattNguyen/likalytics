'use strict';

exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function(table) {
    table.increments().primary();
    table.string('fid').index().unique();
    table.string('first_name');
    table.string('last_name');
    table.string('email');
    table.string('gender');
    table.string('access_token', 300);
    table.string('session_key');
    table.string('session_token', 300).index().unique();
    table.timestamps();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};
