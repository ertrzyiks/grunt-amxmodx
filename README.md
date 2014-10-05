# grunt-amxmodx [![Build Status](https://travis-ci.org/ertrzyiks/grunt-amxmodx.svg?branch=master)](https://travis-ci.org/ertrzyiks/grunt-amxmodx)

> AMX mod X compiler task

## Getting Started
This plugin requires Grunt `~0.4.5` and **works only on linux and windows**.

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-amxmodx --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-amxmodx');
```

## The "amxmodx" task

### Overview
In your project's Gruntfile, add a section named `amxmodx` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  amxmodx: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
});
```

### Installing compilers

####Manual
Use command line util to install compiler version before run task.

```bash
./node_modules/.bin/amxx-install <version>
```

####From package.json
You can use your package.json to specify versions you want to use and install them all with just one command. 
You need to add amxmodx_versions key like following:

```json
"amxmodx_versions": [ "version1", "version2" ]
```

and then use command

```bash
./node_modules/.bin/amxx-install
```

####On demand
If compiler is triggered with not installed version, installation will be done automatically just before compilation.

####Integration with travis
Its required to install package `libc6-i386` in order to run 32bit amxx compiler on 64bit travis environment.

Add following lines to your before_scripts

```
  - sudo apt-get update
  - sudo apt-get install libc6-i386
```

Final .travis.yml may looks like:
```
before_install: npm install -g grunt-cli
install: npm install
before_script:
  - sudo apt-get update
  - sudo apt-get install libc6-i386
script:
  - grunt
```

### Options

#### options.versions
Type: `Array`
Default value: `[ '1.8.2' ]`

Array of strings with version of AMX mod X to compile with.

#### options.output
Type: `string`
Default value: `'tmp/'`

Compilation output folder.

#### options.includePath
Type: `string`
Default value: `null`

Custom include path.

### Usage Examples

#### Custom versions Options
In this example, compilation will be done with 1.8.1 and 1.8.2 version with the default output folder.

package.json
```json
{
  "name": "amxmodx-test",
  "version": "0.0.1",
  "description": "",

  "amxmodx_versions": [
     "1.8.1",
     "1.8.2"
  ]
}
```

Gruntfile.js
```js
grunt.initConfig({
  amxmodx: {
    options:{
      versions: "<%= pkg.amxmodx_versions %>"
    },
    dist: {
      nonull: true,
      src: ['src/test.sma']
    }
  }
});
```


## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
 * 2014-09-14   v0.1.2   Added windows support
 * 2014-08-24   v0.1.1   Added custom include path
 * 2014-08-23   v0.1.0   Initial release
