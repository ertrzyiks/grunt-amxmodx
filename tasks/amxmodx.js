/*
 * grunt-amxmodx
 * https://github.com/ertrzyiks/grunt-amxmodx
 *
 * Copyright (c) 2014 Mateusz Derks
 * Licensed under the MIT license.
 */

'use strict';

var async = require("async"),
    amxxpc = require("./lib/amxxpc.js");

module.exports = function(grunt) {
  grunt.registerMultiTask('amxmodx', 'AMX mod X compiler task', function( ) {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      punctuation: '.',
      separator: ', '
    });
    
    var cb = this.async();
    
    grunt.log.writeln('Processing task...');

    // Iterate over all specified file groups.
    async.each( this.files, function(f, done){
        var src = f.src.filter(function(filepath) {
            if (!grunt.file.exists(filepath)) {
                throw new Error('Source file "' + filepath + '" not found.');
            }
            return true;
        });
        
        async.each(src, function( filepath, next ){
            grunt.log.writeln('Compile file: ' + filepath);
            amxxpc.compile(filepath, next);
        }, function(err){
            done(err);
        });
    }, function(errors){
        if ( errors.length ){
            errors.forEach(function(err){
                if ( err instanceof amxxpc.CompilationWarning )
                {
                    grunt.log.warning(err);
                }
                else
                {
                    grunt.fail.fatal(err);
                }
            });
            
        }
        cb();
    });
  });

};
