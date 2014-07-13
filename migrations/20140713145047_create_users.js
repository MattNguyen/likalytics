'use strict';

exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function(table) {
    table.increments().primary();
    table.string('fid').index().unique();
    table.string('first_name');
    table.string('last_name');
    table.string('email');
    table.string('gender');
    table.timestamps();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};
