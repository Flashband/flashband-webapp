module.exports = function (grunt) {
  grunt.loadNpmTasks('grunt-mocha-cov');
  grunt.registerTask('test', [ 'mochacov:test' ]);
};

