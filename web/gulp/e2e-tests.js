'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var browserSync = require('browser-sync');

gulp.task('webdriver-update', $.protractor.webdriver_update);

gulp.task('webdriver-standalone', $.protractor.webdriver_standalone);

var API = 'api';
var MOCKED = 'mocked';

var registerProtractor = function(mode, done) {
  var testFiles = [
    'test/e2e/**/*.js'
  ];

  var cfg = {};
  if (mode === API) { cfg.configFile = 'test/protractor.conf.api.js'; }

  if (mode === MOCKED) { cfg.configFile = 'test/protractor.conf.mocked.js'; }

  return gulp.src(testFiles).pipe($.protractor.protractor(cfg)).on('error', function (err) {
    throw err;
  }).on('end', function () {
    gulp.run('api:stop');
    browserSync.exit();
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

gulp.task('protractor', ['serve:e2e', 'api:start', onlyProtractorMocked]);
gulp.task('protractor:api', ['serve:e2e', 'api:start', onlyProtractorApi]);
gulp.task('protractor:dist', ['serve:e2e-dist', 'api:start', onlyProtractorApi]);
