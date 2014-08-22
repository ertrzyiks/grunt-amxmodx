'use strict';

var path = require("path"),
    fs = require("fs"),
    rmdir = require("../../utils/rmdir.js"),
    
    install = require("../../../scripts/install.js");
    
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

exports.installer = {
    setUp: function (done) {
        var binPath = path.join(__dirname, "..", "bin");
        
        if (fs.existsSync(binPath))
        {
            rmdir(binPath);
        }
        
        done();
    },
  
    is_not_installed: function (test) {
        test.strictEqual(
            false,
            install.isInstalled("1.8.1"),
            "version 1.8.1 should be not detected"
        );
        test.strictEqual(
            false,
            install.isInstalled("1.8.2"),
            "version 1.8.2 should be not detected"
        );
        
        test.done();
    },
  
    is_installed: function (test) {
        test.expect(4);
        
        test.strictEqual(
            false,
            install.isInstalled("1.8.1"),
            "version 1.8.1 should be not detected"
        );
        test.strictEqual(
            false,
            install.isInstalled("1.8.2"),
            "version 1.8.2 should be not detected"
        );
        
        install.installVersion("1.8.2", function () {
            test.strictEqual(
                false,
                install.isInstalled("1.8.1"),
                "version 1.8.1 should be not detected"
            );
            test.strictEqual(
                true,
                install.isInstalled("1.8.2"),
                "version 1.8.2 should be detected"
            );
            test.done();
        });
    }
};
