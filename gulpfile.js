var gulp       = require('gulp');
var jshint     = require('gulp-jshint');
var clean      = require('gulp-clean');
var handlebars = require('gulp-handlebars');
var server     = require('./server/index');

var config = {
  paths: {
    js: "./src/js/",
    views: "./server/views/"
  }
};

// JSHint
gulp.task('lint', function() {
  gulp.src(config.paths.js + '*.js')
  .pipe(jshint())
  .pipe(jshint.reporter('default'));
});

gulp.task('dev', function() {
  server.start(function() {
    console.log("Hapi server started @" , server.info.uri);
  });
});
