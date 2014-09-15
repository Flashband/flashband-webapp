'use strict';

var gulp = require('gulp');

var withDevDep = true;
var withoutDevDep = false;

var getBowerDeps = function(devDep, excluded) {
  var wiredep = require('wiredep').stream;

  return wiredep({
    directory: 'app/bower_components',
    exclude: excluded,
    dependencies: true,
    devDependencies: devDep
  });
}

gulp.task('wiredep', function () {
  gulp.src('app/styles/*.scss')
    .pipe(getBowerDeps(withoutDevDep, []))
    .pipe(gulp.dest('app/styles'));

  gulp.src('app/*.html')
    .pipe(getBowerDeps(withoutDevDep, ['bootstrap-sass-official']))
    .pipe(gulp.dest('app'));
});

gulp.task('wiredep-dev', function () {
  var wiredep = require('wiredep').stream;

  gulp.src('app/styles/*.scss')
    .pipe(getBowerDeps(withDevDep, []))
    .pipe(gulp.dest('app/styles'));

  gulp.src('app/*.html')
    .pipe(getBowerDeps(withDevDep, ['bootstrap-sass-official']))
    .pipe(gulp.dest('app'));
});
