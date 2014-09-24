'use strict';

module.exports = function (grunt) {
  var config = grunt.config.get('mochacov');
  if (! config) config = {};
  config.test = {
    options: {
      reporter: 'spec'
    },
    all: ['test/']
  };

  grunt.config.set('mochacov', config);
};
