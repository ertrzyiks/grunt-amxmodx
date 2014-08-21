var path = require( "path" ),
    configPath = path.join( __dirname, "../", "config/versions.json" ),
    config = require( configPath ),
    versions = config.versions,
    
    defaultVersion = config.defaultVersion;
    
module.exports = {
    getVersions: function(){
        var vers = [], v;
        for ( v in versions )
        {
            vers.push(v);
        }
        
        return vers;
    },
    
    getDefaultVersion: function (){
        return defaultVersion;
    },
    
    getVersion: function ( version )
    {
        return versions[version];
    },
    
    isVersionAvailable: function( version ){
        return "undefined" !== typeof( versions[version] );
    }
};