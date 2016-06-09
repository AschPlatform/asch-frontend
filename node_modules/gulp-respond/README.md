gulp-respond
============

Send file stream into http server response.

## Usage

First, install `gulp-respond` as a development dependency:

```shell
npm install --save-dev gulp-respond
```

Then, add it to your `gulpfile.js`:

```javascript
var replace = require('gulp-respond');
var connect = require('gulp-connect');

gulp.task('connect', 'Start server using a middleware', function () {
    connect.server({
        root: 'app',
        port: 8080,
        middleware: function () {
            return [function (req, res, next) {
                var url = req.url.split('?').shift();
                gulp.src('src' + url) // load file of an different folder than the root one
                    .pipe(parse()) // do any content modifications
                    .pipe(respond(res)); // push the modified content directly to the response
            }];
        }
    });
});
```