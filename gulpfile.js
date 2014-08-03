var gulp       = require('gulp');
var jshint     = require('gulp-jshint');
var clean      = require('gulp-clean');
var nodemon    = require('gulp-nodemon');

// JSHint
gulp.task('lint', function() {
  gulp.src('./server/**/*.js')
  .pipe(jshint())
  .pipe(jshint.reporter('default'));
});

gulp.task('dev', function() {
  nodemon({
    script: './server/index.js',
    ignore: ['gulpfile.js', 'knexfile.js', 'migrations', 'node_modules'],
    env: {
      'NODE_ENV': 'development',
      'PORT': 8080,
      'HOST': 'localhost'
    },
    nodeArgs: ['--debug']
  })
  .on('change', ['lint']);
});
