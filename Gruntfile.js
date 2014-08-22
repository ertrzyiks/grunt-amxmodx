/*
 * grunt-amxmodx
 * https://github.com/ertrzyiks/grunt-amxmodx
 *
 * Copyright (c) 2014 Mateusz Derks
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        jshint: {
            all: [
                'Gruntfile.js',
                'tasks/*.js',
                'tasks/lib/*.js',
                'scripts/*.js',
                'config/*.js',
                '<%= nodeunit.task_tests %>',
                '<%= nodeunit.general_tests %>'
            ],
            options: {
                jshintrc: '.jshintrc'
            }
        },

        // Before generating any new files, remove any previously-created files.
        clean: {
            tests: ['tmp', 'bin']
        },

        // Configuration to be run (and then tested).
        amxmodx: {
            default_options: {
                files: {
                    src: ['test/fixtures/testing.sma']
                }
            },
            custom_options: {
                options: {
                    versions: [
                        '1.8.1',
                        '1.8.2'
                    ],
                    output: "tmp/amxx/"
                },
                files: {
                    src: ['test/fixtures/testing.sma']
                }
            }
        },

        // Unit tests.
        nodeunit: {
            task_tests: ['test/suite/task/*_test.js'],
            general_tests: ['test/suite/general/*_test.js']
        }
    });

    // Actually load this plugin's task(s).
    grunt.loadTasks('tasks');

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-nodeunit');

    // Whenever the "test" task is run, first clean the "tmp" dir, then run this
    // plugin's task(s), then test the result.
    grunt.registerTask('test', [
        'clean',
        'nodeunit:general_tests',
        'clean',
        'amxmodx',
        'nodeunit:task_tests'
    ]);

    // By default, lint and run all tests.
    grunt.registerTask('default', ['jshint', 'test']);
};
