#!/usr/bin/env node

var install = require("./scripts/install.js"),
    config = require("./config/config.js"),
    version = process.argv[2],
    
    path = require("path"),
    fs = require("fs"),
    clc = require("cli-color"),
    async = require("async"),
    
    packageJson = path.join(process.cwd(), "package.json"),
    
    pkg = {};

try
{
    pkg = require(packageJson);
}
catch(e)
{

}

if ( "undefined" !== typeof(version) )
{
    console.log("Installing version: " + clc.yellow.underline(version));
    installVersion(version, onDone);
}
else if ( "undefined" !== typeof(pkg.amxmodx_versions) )
{
    var calls = pkg.amxmodx_versions.map(function(version){
        return function( done ){
            console.log("Installing version: " + clc.yellow.underline(version) + clc.green("(from package.json)"));
            
            installVersion(version, done);
        };
    });
   
    async.series(calls, onDone);
}
else
{
    version = config.getDefaultVersion();
    console.log("Installing version: " + clc.yellow.underline(version) + clc.green("(default)"));
    
    installVersion(version, onDone);
}

function installVersion(version, done)
{
    if ( false === config.isVersionAvailable( version ) )
    {
        console.log("Version: " + clc.yellow.underline(version) + " not found. Available versions");
        
        var versions = config.getAvailableVersions();
        
        for ( var i = 0; i < versions.length; i++)
        {
            console.log("    ", versions[i]);
        }
    }
    else
    {
        install.installVersion( version, done );
    }
}

function onDone(err)
{
    if ( err )
    {
        throw err;
    }
    
    console.log(clc.bold.green("Done."));
}



