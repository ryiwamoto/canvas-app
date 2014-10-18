gulp = require("gulp")
$ = require("gulp-load-plugins")()

webpackConfig =
  output:
    filename: 'scripts/all.js'
  module:
    loaders: []
  resolve:
    extensions: ["", ".ts", ".js"]

tscConfig =
  target: 'es5'
  outDir: 'lib'
  module: 'amd'
  noImplicitAny: true
  tmpDir: '.tmp'
  safe: true
  emitError: true

gulp.task 'ts', ->
  gulp.src('./app/**/*.ts')
  .pipe($.plumber(errorHandler: $.notify.onError("Error: <%= error.message %>")))
  .pipe($.tsc(tscConfig))
  .pipe(gulp.dest('./lib'))
  .pipe($.notify({message: "TypeScript compilation successfully ended", onLast: true}))

gulp.task 'webpack', ->
  gulp.src('lib/main.js')
  .pipe($.plumber(errorHandler: $.notify.onError("Error: <%= error.message %>")))
  .pipe($.webpack(webpackConfig))
  .pipe(gulp.dest('public'))

gulp.task 'watch', ['webpack'], ->
  gulp.watch 'app/**/*.ts', ['ts']
  gulp.watch 'lib/**/*.js', ['webpack']

gulp.task 'default', ['webpack']

