/*
 * grunt-amxmodx
 * https://github.com/ertrzyiks/grunt-amxmodx
 *
 * Copyright (c) 2014 Mateusz Derks
 * Licensed under the MIT license.
 */

'use strict';

var async = require("async"),
    clc = require("cli-color"),
    install = require("../scripts/install.js"),
    amxxpc = require("./lib/amxxpc.js");

module.exports = function(grunt) {
    grunt.registerMultiTask('amxmodx', 'AMX mod X compiler task', function( ) {
        // Merge task-specific and/or target-specific options with these defaults.
        var options = this.options({
          versions: [ install.getDefaultVersion() ]
        });
    
        var cb = this.async();
        var files = this.files;
        
        grunt.log.writeln('Processing task...');

        var calls = options.versions.map(function(version){
            return function(next){
            
                grunt.log.writeln("===================================");
                grunt.log.writeln('Compile using version ' + clc.yellow.underline(version));
                grunt.log.writeln("===================================");
                
                // Iterate over all specified file groups.
                async.each( files, compileFiles(version), function(errors){
                    onCompile(errors, next);
                } );
            };
        });
    
        async.series(calls, cb);
    });
  
    function compileFiles( version )
    {
        return function(f, done){
            var src = f.src.filter(function(filepath) {
                if (!grunt.file.exists(filepath)) {
                    throw new Error('Source file ' + clc.green(filepath) + ' not found.');
                }
                return true;
            });
        
            async.each(src, function( filepath, next ){
            
                grunt.log.writeln( clc.green(filepath) );
                amxxpc.compile( version, filepath, function(err){
                     console.log("-------------------------------");
                     next(err);
                } );
            }, function(err){
                done(err);
            });
        };
    
  }
  
    function onCompile( errors, cb )
    {
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
            
            cb(errors)
        }
        else
        {
            cb();
        }
    }

};
