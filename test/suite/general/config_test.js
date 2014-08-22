'use strict';

var path = require("path"),
    fs = require("fs"),
    rmdir = require("../../utils/rmdir.js"),
    
    config = require("../../../config/config.js");
    
/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.config = {
    get_versions_array: function (test)
    {
        var versions = config.getVersions();
        test.equal(
            "[object Array]",
            Object.prototype.toString.call(versions),
            "getVersion should return an array"
        );
        
        test.done();
    },
    
    get_versions_without_reference: function (test) {
        var versions = config.getVersions();
        versions.push("put-some-random-version-here");
        
        test.notEqual(
            versions.length,
            config.getVersions().length,
            "versions array should not be returned with reference"
        );
        
        test.done();
    },
    
    get_default_version: function (test)
    {
        var defaultVersion = config.getDefaultVersion();
        
        test.equal(
            "[object String]",
            Object.prototype.toString.call(defaultVersion),
            "getDefaultVersion should return a string"
        );
        
        test.strictEqual(
            true,
            config.isVersionAvailable(defaultVersion),
            "getDefaultVersion should return a available version"
        );
        
        test.done();
    },
    
    is_version_available: function (test)
    {
        test.strictEqual(
            false,
            config.isVersionAvailable(),
            "isVersionAvailable should return false on invalid version"
        );
        
        test.strictEqual(
            false,
            config.isVersionAvailable(false),
            "isVersionAvailable should return false on invalid version"
        );
        
        test.strictEqual(
            false,
            config.isVersionAvailable(""),
            "isVersionAvailable should return false on invalid version"
        );
        
        test.strictEqual(
            false,
            config.isVersionAvailable(1),
            "isVersionAvailable should return false on invalid version"
        );
        
        test.strictEqual(
            false,
            config.isVersionAvailable(function () {}),
            "isVersionAvailable should return false on invalid version"
        );
        
        test.strictEqual(
            true,
            config.isVersionAvailable("1.8.2"),
            "isVersionAvailable should return true on valid version"
        );
        
        test.done();
    },
    
    get_version_data: function (test)
    {
        test.doesNotThrow(function () {
            var data = config.getVersionData("1.8.2");
        });
        
        test.throws(function () {
            var data = config.getVersionData("invalid-version");
        });
        
        test.done();
    }
};
