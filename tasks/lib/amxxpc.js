var path = require("path")
    spawn = require('child_process').spawn;

module.exports = amxxpc = {};

amxxpc.CompilationError = function(){
    
};

amxxpc.CompilationWarning = function(){
    
};

amxxpc.compile = function( src, done ){
    var amxxpcPath = path.join(__dirname, "../../", "bin/build/packages/base/addons/amxmodx/scripting");
    var sourcePath = path.resolve(src);
    var amxxpc = spawn("./amxxpc", [ sourcePath ], { cwd: amxxpcPath });
    var errors = [];
    
    amxxpc.stdout.on('data', function (data) {
        var output = data + '';
        
        if ( output.match(/Could not locate output file/) )
        {
            errors.push( new amxxpc.CompilationError("Compilation failed!") );
        }
        
        console.log('' + data);
    });

    amxxpc.stderr.on('data', function (data) {
        console.log('' + data);
    });

    amxxpc.on('close', function (code) {
        if ( 0 !== code )
        {
            errors.push( new amxxpc.CompilationError('child process exited with code ' + code) );
        }
        
        done(errors);
    });
};