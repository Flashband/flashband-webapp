'use strict';

var gulp = require('gulp');

var $ = require('gulp-load-plugins')();

var browserSync = require('browser-sync');
var childProcess = require('child_process');
var phantomjs;

//gulp.task('webdriver-standalone', $.protractor.webdriver_standalone);

var registerProtractor = function(done) {
  var testFiles = [
    'test/e2e/**/*.js'
  ];

  var cfg = {
    configFile: 'test/protractor.conf.phantomjs.js'
  };

  console.log('Starting PhantomJS --webdriver');
  phantomjs = childProcess.spawn('./node_modules/.bin/phantomjs', ['--webdriver=localhost:4444']).on('error', function(err) {
    throw err;
  }).on('end', function() {
    console.log('PhantomJS terminated.');
  });

  return gulp.src(testFiles).pipe($.protractor.protractor(cfg)).on('error', function (err) {
    throw err;
  }).on('end', function () {
    browserSync.exit();
    if (phantomjs) {
      console.log('Terminating PhantomJS --webdriver');
      phantomjs.kill('SIGTERM');
    }
    done();
  });
};

var onlyProtractorMocked = 'protractor-phantomjs';

gulp.task(onlyProtractorMocked, ['webdriver-update', 'wiredep-dev'], function (done) {
  registerProtractor(done);
});

gulp.task('protractor:phantomjs', ['serve:e2e', onlyProtractorMocked]);
