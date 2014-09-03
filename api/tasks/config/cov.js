'use strict';

module.exports = function (grunt) {
  var config = grunt.config.get('mochacov');
  if (! config) config = {};
  config.cov = {
    options: {
      reporter: 'html-cov'
    },
    all: ['test/']
  };

  grunt.config.set('mochacov', config);
};
