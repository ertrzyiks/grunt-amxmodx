var path = require("path"),
    configPath = path.join(__dirname, "versions.json"),
    config = require(configPath),
    versions = config.versions,
    
    defaultVersion = config.defaultVersion;
    
module.exports = {
    getVersions: function ()
    {
        var vers = [], v;
        for (v in versions)
        {
            vers.push(v);
        }
        
        return vers;
    },
    
    getDefaultVersion: function ()
    {
        return defaultVersion;
    },
    
    getVersionData: function (version)
    {
        if (!this.isVersionAvailable(version))
        {
            throw new Error("Version " + version + " is not available");
        }
        return versions[version];
    },
    
    getVersionBinPath: function (version)
    {
        var binPath = path.join(__dirname, "..", "bin"),
            versionBinPath = path.join(binPath, "amxmodx-" + version);
            
        return versionBinPath;
    },
    
    getExecutablePath: function (version)
    {
        return path.join(this.getVersionBinPath(version), "addons", "amxmodx", "scripting", "amxxpc");
    },
    
    isVersionAvailable: function (version)
    {
        if (typeof version !== "string")
        {
            return false;
        }
        
        return "undefined" !== typeof(versions[version]);
    }
};