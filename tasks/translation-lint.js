/*jslint node: true */
'use strict';

module.exports = function(grunt) {

  var count=0;
  var failed=false;

  var lint = function(file){
    if(file.content.indexOf('_(') > 0) {
      grunt.log.warn('Translation lint failed for ' + file.src);
      failed=true;
    }
    ++count;
  };

  var read = function(filesrc) {
    return {
      'content': grunt.file.read(filesrc),
      'src': filesrc
    };
  };

  var init = function(){
    this.files.forEach(function(f) {
      if(!f.src.length) {
        grunt.fail.warn('No files to lint for ' + f.dest);
        return;
      }
      f.src
        .map(read)
        .map(lint);
      grunt.log.writeln(count + ' translation files checked.');
      if(failed){
        var msg = 'Not all files translated successfully.\nCheck failed file ';
        msg += 'for "_(" and remove from the msgid any nested quotes, ';
        msg += 'parens, or any other offending characters.\n';
        grunt.fail.warn(msg);
      } else {
        grunt.log.ok('All "_(...)" free');
      }
    });
  };

  grunt.registerMultiTask(
    'translationLint',
    'Searches the translated files for missed translation calls',
    init);
};
