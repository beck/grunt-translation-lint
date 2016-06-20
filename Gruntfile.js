'use strict';

module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({

    jshint: {
      options: {
        jshintrc: '.jshintrc',
      },
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        'test/*.js'
      ]
    },

    mochaTest: {
      'spec': {
        options: {
          reporter: 'spec',
        },
        src: ['tests/**/*-spec.js']
      }
    }

  });

  // load this plugin's task(s).
  grunt.loadTasks('tasks');

  grunt.registerTask('test', [
    'jshint',
    'mochaTest'
  ]);
  grunt.registerTask('default', ['test']);

};
