/*global before */
/*jslint node: true */
'use strict';

var assert  = require('assert');
var grunt = require('grunt');
var path = require('path');


function callLintTask(taskname, out, done){
  /* execute a grunt task using the fixture's gruntfile */
  var gruntExec = path.resolve('node_modules/.bin/grunt');
  var fixtureDir = path.join(__dirname, 'fixture');
  var gruntfile = path.join(fixtureDir, 'Gruntfile.js');
  var task = 'translationLint:' + taskname;
  var saveOutputAndDone = function(error, result, code){
    out.error = error;
    out.result = result;
    out.code = code;
    done();
  };
  var cmd = {
    'cmd': 'node',
    'args': [gruntExec, '--gruntfile', gruntfile, task]
  };
  grunt.util.spawn(cmd, saveOutputAndDone);
}


describe('Translation linter', function() {


  describe('sourced with files free of translation calls', function(){

    var out = {};

    before(function(done) {
      callLintTask('lintTheGood', out, done);
    });

    it('exits succesfully', function(){
      assert.equal(out.code, 0);
    });

  });


  describe('sourced with files dirty with translation calls', function(){

    var out = {};

    before(function(done) {
      callLintTask('lintTheBad', out, done);
    });

    it('blows up', function(){
      assert.notEqual(out.code, 0);
    });

  });


});
