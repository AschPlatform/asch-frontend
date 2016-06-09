var nodePath = require('path'),
    sep      = nodePath.sep,
    fs       = require('fs'),
    file     = require('file');

/**
 * Recurses through the supplied paths, returning an array of file paths found
 * in each. Paths may be a string, or an array of strings. The paths may be
 * strings pointing to files or directories. Accepts an options object with
 * the following keys: ignore and ext. opts.ignore takes either a single
 * string pattern or array of patterns to ignore. opts.ext accepts either
 * a string, or array of strings corresponding to filename extensions to
 * retrieve.
 *
 * @param {string|string[]} paths The paths to traverse
 * @param {object}          opts  Options object with ignore and ext keys
 */
exports.getSync = function(paths, opts) {
  var results, ignorePatterns, i;

  paths = paths || [];
  opts = opts || {};
  results = [];

  if (!(paths instanceof Array)) {
    paths = [paths];
  }

  ignorePatterns = [];
  if (opts.ignore) {
    if (!(opts.ignore instanceof Array)) {
      opts.ignore = [opts.ignore];
    }

    for (i = 0; i < opts.ignore.length; i++) {
      ignorePatterns.push(new RegExp(opts.ignore[i]));
    }
  }

  if (!opts.ext) {
    opts.ext = [];
  } else if (!(opts.ext instanceof Array)) {
    opts.ext = [opts.ext];
  }

  paths.forEach(function(path) {
    if (!fs.existsSync(path)) {
      throw new Error('No such file or directory: ' + path);
    } else if (fs.statSync(path).isFile()) {
      return results.push(path);
    }

    file.walkSync(path, function(dirPath, dirs, files) {
      files.forEach(function(file) {
        var filePath;
        var ext = nodePath.extname(file);

        if (opts.ext.length && opts.ext.indexOf(ext) === -1) {
          return;
        }

        if (dirPath.slice(-1) !== sep) {
          dirPath += sep;
        }

        if (dirPath.indexOf(sep) !== 0 && dirPath.indexOf('.') !== 0) {
          dirPath = './' + dirPath;
        }

        filePath = dirPath + file;

        for (var i = 0; i < ignorePatterns.length; i++) {
          if (ignorePatterns[i].test(filePath)) return;
        }

        results.push(filePath);
      });
    });
  });

  return results;
};
