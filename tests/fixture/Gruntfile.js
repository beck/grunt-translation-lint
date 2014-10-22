module.exports = function(grunt) {
  'use strict';

  grunt.loadTasks('../../tasks');

  grunt.initConfig({

    translationLint: {
      lintTheGood: {
        src: ['free-of-translation-calls.json']
      },
      lintTheBad: {
        src: ['dirty-with-translation-calls.json']
      }
    },

  });

};
