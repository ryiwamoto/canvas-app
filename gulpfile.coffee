gulp = require("gulp")
path = require("path")
runSequence = require('run-sequence')
$ = require("gulp-load-plugins")()
webpack = require("webpack")

dirConfig =
  webpackTmpDir: './webpack-tmp'

webpackConfig =
  output:
    filename: 'scripts/all.js'
  module:
    loaders: [
      { test: /\.css$/, loader: "style!css" }
    ]
  resolve:
    extensions: ["", ".ts", ".js"]
    root: [path.join(__dirname, "app", "lib")]
  plugins: [
    new webpack.ResolverPlugin(
      new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin("bower.json", ["main"])
    )
  ]

tscConfig =
  target: 'es5'
  outDir: dirConfig.webpackTmpDir
  module: 'amd'
  noImplicitAny: true
  tmpDir: '.tmp'
  safe: true
  emitError: true
  tscSearch: ["cwd"]

errorReporter = () =>
  $.plumber(errorHandler: $.notify.onError("Error: <%= error.message %>"))

gulp.task 'ts', ->
  gulp.src('./app/**/*.ts')
  .pipe(errorReporter())
  .pipe($.tsc(tscConfig))
  .pipe(gulp.dest(dirConfig.webpackTmpDir))
  .pipe($.notify({message: "TypeScript compilation successfully ended", onLast: true}))

gulp.task 'build-clean', ->
  gulp.src(dirConfig.webpackTmpDir)
  .pipe($.clean())

gulp.task 'webpack', ->
  gulp.src(path.join(dirConfig.webpackTmpDir, 'main.js'))
  .pipe(errorReporter())
  .pipe($.webpack(webpackConfig))
  .pipe(gulp.dest('public'))
  .on('error', (error) =>
    $.notify(error.message))

gulp.task 'css', ->
  gulp.src(["app/**/*.css", "!app/lib/**/*.css"])
  .pipe(gulp.dest(dirConfig.webpackTmpDir))

gulp.task 'template', ->
  gulp.src('app/view/**/*.hbs', base: 'app')
  .pipe(errorReporter())
  .pipe($.handlebars())
  .pipe($.defineModule('amd'))
  .pipe(gulp.dest(dirConfig.webpackTmpDir))

gulp.task 'full-build', (callback) ->
  runSequence('build-clean', ['css', 'ts', 'template'], 'webpack', callback)

gulp.task 'template-webpack'

gulp.task 'watch', ->
  $.watch 'app/view/**/*.hbs', (event, callback) => runSequence('template', 'webpack', callback);
  $.watch 'app/**/*.ts', (event, callback) => runSequence('ts', 'webpack', callback);
  $.watch ["app/**/*.css", "!app/lib/**/*.css"], (event, callback) => runSequence('css', 'webpack', callback);
