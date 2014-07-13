'use strict';

exports.up = function(knex, Promise) {
  return knex.schema.createTable('likes', function(table) {
    table.increments().primary();
    table.string('fid').index().unique();
    table.string('photo_fid').references('photos.fid');
    table.string('user_fid').references('users.fid');
    table.boolean('unlike').defaultTo(false);
    table.timestamps();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('likes');
};
