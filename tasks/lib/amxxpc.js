var path = require("path")
    fs = require("fs"),
    spawn = require('child_process').spawn,
    
    config = require( path.join( __dirname, "../../", "config/config.js" ) ),
    defaultVersion = config.getDefaultVersion();

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

/**
 * 
 */
amxxpc.compile = function( src, options, done ){
    var version = options.version || defaultVersion,
        args = options.args || [],
        amxxpcPath = path.join(__dirname, "../../", "bin", "amxmodx-" + version, "addons/amxmodx/scripting"),
        sourcePath = path.resolve( src );
    
    args.push( sourcePath );
    
    var proc = spawn("./amxxpc", args, { cwd: amxxpcPath });
    var errors = [];
    
    proc.on('error', function(err){
        if ( err && err.code === 'ENOENT' )
        {
            if ( process.platform === 'linux' && ( -1 !== ["x64", "ia64"].indexOf(process.arch) ) )
            {
                console.log("You are trying to run 32bit executable on 64bit architecture.");
                console.log("Check for compatibility packages for your system, like 'libc6-i386'");
            }
        }
        
        throw err;
    });
        
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
