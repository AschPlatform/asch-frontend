inject = require("node-kissdi").inject
dargs = require "dargs"
through = require "through2"
gutil = require "gulp-util"
merge = require "merge"
path = require "path"
q = require "q"
mapConverter = require "convert-source-map"
testing = process.env.testing
applySourceMap = require "vinyl-sourcemaps-apply"

compile = inject [
  "exec"
  "mkdirp"
  "fs"
  (exec, mkdirp, fs) ->
    (opts) ->
      (file, enc, cb) ->
        if file.isNull()
          return cb null, file
        options =
          "bundleExec": false
          "sourcemap": "auto"
          "tmpPath": ".gulp-scss-cache"
        merge(options, opts)
        passedArgs = dargs options, (
          "excludes": ["bundleExec", "tmpPath"]
        )
        tmpDir = path.join(
          file.cwd,
          options.tmpPath,
          path.relative(file.cwd, file.base),
          path.dirname(file.relative)
        )

        compilerPromise = q.defer()
        q.nfcall(mkdirp, tmpDir).then(
          ->
            defer = q.defer()
            command = []
            if options.bundleExec
              command = command.concat "bundle", "exec"
            command.push "scss"
            command = command.concat(
              passedArgs
              file.path
              path.join(
                tmpDir,
                gutil.replaceExtension(path.basename(file.relative), ".css")
              )
            )

            proc = exec command.join " "
            proc.on "error", defer.reject
            proc.on "close", (code) ->
              if code is 0
                defer.resolve()
              else
                defer.reject "The command exited with code:#{code}"
            return defer.promise
        ).then(
          ->
            file.path = gutil.replaceExtension file.path, ".css"
            # I want to pass readable stream, but I don't.
            # Why? Almost all gulp plugins don't support stream!
            q.nfcall fs.readFile, path.join(
              tmpDir,
              gutil.replaceExtension(path.basename(file.relative), ".css")
            )
        ).then(
          (contents) ->
            contents = contents.toString "utf8"
            sourcemap = mapConverter.fromMapFileSource contents, tmpDir
            if sourcemap
              sourcemap = sourcemap.sourcemap
              if options.sourcemap is "auto"
                sourcemap.sources = sourcemap.sources.map (file) ->
                  path.relative(
                    process.cwd(),
                    path.resolve tmpDir, file
                  )
              applySourceMap file, sourcemap
            file.contents = new Buffer(
              mapConverter.removeMapFileComments(contents).trim()
            )
            cb null, file
            compilerPromise.resolve()
        ).catch(
          (e) ->
            error = new gutil.PluginError(
              "gulp-scss",
              "Compilation failed.: #{e}\n\nStack Trace:\n#{e.stack}"
            )
            compilerPromise.reject error
            cb error
            throw error
        )
        return compilerPromise.promise
], (
  "exec": require("child_process").exec
  "mkdirp": require "mkdirp"
  "fs": require("fs")
)

module.exports = (options) -> through.obj compile.invoke()(options)

if testing
  module.exports.__compile__ = compile
