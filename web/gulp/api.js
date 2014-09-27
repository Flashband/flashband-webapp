'use strict';

var gulp = require('gulp');

var childProcess = require('child_process');

var api = false;

gulp.task('api:start', function() {
    api = childProcess.spawn('../api/node_modules/.bin/sails', ['lift'], {cwd: '../api/'}).on('error', function(err) {
      throw err;
    }).on('end', function() {
      console.log('Flashband API Server terminated.');
    });
});

gulp.task('api:stop', function() {
  if (api) { api.kill('SIGTERM'); }
});
