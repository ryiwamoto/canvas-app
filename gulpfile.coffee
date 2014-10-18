gulp = require("gulp")
path = require("path")
$ = require("gulp-load-plugins")()
webpack = require("webpack")

webpackConfig =
  output:
    filename: 'scripts/all.js'
  module:
    loaders: []
  resolve:
    extensions: ["", ".ts", ".js"]
    root: [path.join(__dirname, "app", "lib")]
  plugins: [
    new webpack.ProvidePlugin({
      Handlebars: "handlebars"
    }),
    new webpack.ResolverPlugin(
      new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin("bower.json", ["main"])
    )
  ]

tscConfig =
  target: 'es5'
  outDir: 'lib'
  module: 'amd'
  noImplicitAny: true
  tmpDir: '.tmp'
  safe: true
  emitError: true

errorReporter = () =>
  $.plumber(errorHandler: $.notify.onError("Error: <%= error.message %>"))

gulp.task 'ts', ->
  gulp.src('./app/**/*.ts')
  .pipe(errorReporter())
  .pipe($.tsc(tscConfig))
  .pipe(gulp.dest('./lib'))
  .pipe($.notify({message: "TypeScript compilation successfully ended", onLast: true}))

gulp.task 'webpack', ->
  gulp.src('lib/main.js')
  .pipe(errorReporter())
  .pipe($.webpack(webpackConfig))
  .pipe(gulp.dest('public'))
  .on('error', (error) =>
    $.notify(error.message))

gulp.task 'template', ->
  gulp.src('app/view/**/*.hbs', base: 'app')
  .pipe(errorReporter())
  .pipe($.handlebars())
  .pipe($.defineModule('amd'))
  .pipe(gulp.dest("lib"))

gulp.task 'watch', ['webpack'], ->
  gulp.watch 'app/view/**/*.hbs', ['template']
  gulp.watch 'app/**/*.ts', ['ts']
  gulp.watch 'lib/**/*.js', ['webpack']

gulp.task 'default', ['webpack']
