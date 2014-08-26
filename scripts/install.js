var path = require("path"),
    request = require("request"),
    clc = require("cli-color"),
    mkdirp = require("mkdirp"),
    fs = require("fs"),
    spawn = require('child_process').spawn,
    
    config = require(path.join(__dirname, "../config/config.js")),
    versions = config.getVersions(),
    defaultVersion = config.getDefaultVersion();
    
var install = module.exports = {};

install.isInstalled = function (version)
{
    var executablePath = config.getExecutablePath(version);
    
    if (!fs.existsSync(executablePath))
    {
        return false;
    }
    
    return true;
};

install.installVersion = function (version, next) {
    if (false === config.isVersionAvailable(version))
    {
        next("Version '" + version + "' not found.");
        return;
    }
    
    function doInstall(version, done)
    {
        if (install.isInstalled(version))
        {
            done();
            return;
        }
        
        var versionConfig = config.getVersionData(version),
            tarball = versionConfig.linux,
            
            versionBinPath = config.getVersionBinPath(version),
            localTarball = path.join(versionBinPath, "amxmodx-" + version + ".archive");
        
        mkdirp.sync(versionBinPath);
        
        downloadFile(tarball, localTarball, function (err, filepath) {
            if (err)
            {
                done(err);
                return;
            }
            
            extractFile(filepath, function (err) {
                if (err)
                {
                    done(err);
                    return;
                }
                
                fs.unlinkSync(localTarball);
                done();
            });
        });
    }

    function extractFile(filepath, done)
    {
        console.log("Extracting " + clc.green(filepath));
        var folder = path.dirname(filepath);
        var filename = path.basename(filepath);
        var proc = spawn("tar", [ "-xvf", filename ], { cwd: folder });
        var error = "";
            
        proc.stdout.on('data', function (data) {
            //console.log('' + data);
        });

        proc.stderr.on('data', function (data) {
            error += data;
        });

        proc.on('close', function (code) {
            if (0 !== code)
            {
                console.log(error);
                done("Tar return code " + code);
                return;
            }
            
            console.log("");
            done();
        });
    }
    
    var progressPercent = 0;
    
    function onProgress(current, total) {
        var percent = Math.floor(current / total * 100);
        
        if (percent !== progressPercent && percent % 10 === 0)
        {
            progressPercent = percent;
            console.log('    downloaded ' + progressPercent + '%');
        }
       
    }
    
    function downloadFile(url, output, done)
    {
        console.log("Downloading " + clc.green(url));
          
        var stream = request(url);
        stream.pipe(fs.createWriteStream(output));
        stream.on('end', function () {
            done(null, output);
        });
    }
     
    doInstall(version, next);
};
    
