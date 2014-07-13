'use strict';

exports.up = function(knex, Promise) {
  return knex.schema.createTable('photos', function(table) {
    table.increments().primary();
    table.string('fid').index().unique();
    table.string('link');
    table.text('message');
    table.integer('user_id').references('users.id');
    table.timestamps();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('photos');
};
