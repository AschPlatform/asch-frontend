var mock      = require('mock-fs'),
    expect    = require('chai').expect,
    filepaths = require('./index.js'),
    getSync   = filepaths.getSync;

before(function() {
  mock({
    'empty': {},
    'file.txt': 'test',
    'foobar': {
      'foo.js': '',
      'bar.html': '',
      'baz.css': ''
    },
    'some': {
      'nested': {'file': ''}
    },
    'project': {
      'node_modules': {'dependency.js': ''},
      'lib': {'app.js': ''},
      'spec': {'appSpec.js': ''}
    }
  });
});

after(function() {
  mock.restore();
});

describe('getSync', function() {
  it('returns an empty array given an empty path', function() {
    var paths = getSync('empty');
    expect(paths).to.eql([]);
  });

  it('accepts paths to files', function() {
    var paths = getSync('file.txt');
    expect(paths).to.eql(['file.txt']);
  });

  it('traverses directories', function() {
    var paths = getSync('foobar');
    expect(paths).to.eql(['./foobar/bar.html', './foobar/baz.css',
      './foobar/foo.js']);
  });

  it('accepts multiple paths', function() {
    var paths = getSync(['empty', 'file.txt', 'foobar']);
    expect(paths).to.eql(['file.txt', './foobar/bar.html', './foobar/baz.css',
      './foobar/foo.js',]);
  });

  it('traverses sub-directories', function() {
    var paths = getSync('some');
    expect(paths).to.eql(['./some/nested/file']);
  });

  describe('opts.ext', function() {
    it('only retrieves files matching the extension', function() {
      var paths = getSync('foobar', {ext: '.js'});
      expect(paths).to.eql(['./foobar/foo.js']);
    });

    it('accepts an array of extensions to match', function() {
      var paths = getSync('foobar', {ext: ['.js', '.css']});
      expect(paths).to.eql(['./foobar/baz.css', './foobar/foo.js']);
    });
  });

  describe('opts.ignore', function() {
    it('ignores paths containing the specified pattern', function() {
      var paths = getSync('project', {ignore: 'node_modules'});
      expect(paths).to.eql(['./project/lib/app.js',
        './project/spec/appSpec.js']);
    });

    it('uses RegExps for the patterns', function() {
      var paths = getSync('project', {ignore: 'lib|spec'});
      expect(paths).to.eql(['./project/node_modules/dependency.js']);
    });

    it('accepts an array of patterns to ignore', function() {
      var paths = getSync('project', {ignore: ['lib', 'spec']});
      expect(paths).to.eql(['./project/node_modules/dependency.js']);
    });
  });
});
