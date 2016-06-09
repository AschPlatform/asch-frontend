filepaths
==============

Get paths to all files in dirs/subdirs in node

[![Build Status](https://travis-ci.org/danielstjules/filepaths.svg?branch=master)](https://travis-ci.org/danielstjules/filepaths)

#### getSync(paths, [opts])

Recurses through the supplied paths, returning an array of file paths found
in each. Paths may be a string, or an array of strings. The paths may be
strings pointing to files or directories. Accepts an options object with
the following keys: ignore and ext. opts.ignore takes either a single
string pattern or array of patterns to ignore. opts.ext accepts either
a string, or array of strings corresponding to filename extensions to
retrieve.

``` javascript
var filepaths = require('filepaths');

filepaths.getSync('/dir');

filePaths.getSync('/lib', {ext: '.js'});

filePaths.getSync('/project', {ignore: 'node_modules'});

filePaths.getSync('/project', {ignore: 'test|spec'});

filepaths.getSync(['/dir1', '/dir2'], {
  ext:    ['.js', '.jsx'],
  ignore: ['node_modules']
});
```
