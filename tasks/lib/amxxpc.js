var path = require("path")
    spawn = require('child_process').spawn;

var amxxpc = module.exports = {};

amxxpc.CompilationError = function( message ){
    this.message = message;
};

amxxpc.CompilationError.prototype.toString = function(){
    return this.message;
};

amxxpc.CompilationWarning = function( message ){
    this.message = message;
};

amxxpc.CompilationWarning.prototype.toString = function(){
    return this.message;
}

amxxpc.compile = function( src, done ){
    var amxxpcPath = path.join(__dirname, "../../", "bin/build/packages/base/addons/amxmodx/scripting");
    var sourcePath = path.resolve(src);
    var proc = spawn("./amxxpc", [ sourcePath ], { cwd: amxxpcPath });
    var errors = [];
        
    proc.stdout.on('data', function (data) {
        var output = data + '';
        
        if ( output.match(/Could not locate output file/) )
        {
            errors.push( new amxxpc.CompilationError("Compilation failed!") );
        }
        
        
        console.log('' + data);
    });

    proc.stderr.on('data', function (data) {
        console.log('' + data);
    });

    proc.on('close', function (code) {
        if ( 0 !== code )
        {
            errors.push( new amxxpc.CompilationError('child process exited with code ' + code) );
        }
        
        done(errors);
    });
};
