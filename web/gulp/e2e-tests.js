'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var browserSync = require('browser-sync');
var childProcess = require('child_process');

gulp.task('webdriver-update', $.protractor.webdriver_update);

gulp.task('webdriver-standalone', $.protractor.webdriver_standalone);

var API = "api";
var MOCKED = "mocked";

var registerProtractor = function(mode, done) {
  var flashbandServer = false;
  var testFiles = [
    'test/e2e/**/*.js'
  ];

  var cfg = {};
  if (mode === API) cfg.configFile = 'test/protractor.conf.api.js';

  if (mode === MOCKED) {
    cfg.configFile = 'test/protractor.conf.mocked.js';

    console.log('Starting Flashband API Server');
    flashbandServer = childProcess.spawn('../api/node_modules/.bin/sails', ['lift'], {cwd: '../api/'}).on('error', function(err) {
      throw err;
    }).on('end', function() {
      console.log('Flashband API Server terminated.');
    });
  }

  return gulp.src(testFiles).pipe($.protractor.protractor(cfg)).on('error', function (err) {
    throw err;
  }).on('end', function () {
    browserSync.exit();
    if (flashbandServer) flashbandServer.kill('SIGTERM');
    done();
  });
};

var onlyProtractorApi = 'protractor-only-api';
var onlyProtractorMocked = 'protractor-only-mocked';

gulp.task(onlyProtractorApi, ['webdriver-update', 'wiredep'], function (done) {
  registerProtractor(API, done);
});

gulp.task(onlyProtractorMocked, ['webdriver-update', 'wiredep-dev'], function (done) {
  registerProtractor(MOCKED, done);
});

gulp.task('protractor', ['serve:e2e', onlyProtractorMocked]);
gulp.task('protractor:api', ['serve:e2e', onlyProtractorApi]);
gulp.task('protractor:dist', ['serve:e2e-dist', onlyProtractorApi]);
