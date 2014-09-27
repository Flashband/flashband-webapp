'use strict';
var gulp = require('gulp');
//var gutil = require('gulp-util');

var watch = function(files, tasks) {
  var watcher = gulp.watch(files, tasks);
  watcher.on('end', function() {
    console.log('##### ON END');
    gulp.run('api:stop');
  });
  watcher.on('error', function(err) {
    console.log('##### ON ERROR: ', err);
    gulp.run('apo:stop');
  });
};

gulp.task('watch', ['wiredep', 'styles'] ,function () {
  watch('app/styles/**/*.scss', ['styles']);
  watch('app/scripts/**/*.js', ['scripts']);
  watch('app/images/**/*', ['images']);
  watch('bower.json', ['wiredep']);
});
