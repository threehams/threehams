'use strict';

var gulp = require('gulp');

var browserify = require('browserify');
var watchify = require('watchify');
var source = require('vinyl-source-stream');
var browserSync = require('browser-sync');
var del = require('del');
var path = require('path');
var runSequence = require('run-sequence');
var jadeify = require('jadeify');
var sass = require('gulp-sass');
var reload = browserSync.reload;
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var streamify = require('gulp-streamify');
var gzip = require('gulp-gzip');
var pngquant = require('imagemin-pngquant');
var connect = require('gulp-connect');
var svgstore = require('gulp-svgstore');
var svgmin = require('gulp-svgmin');

gulp.task('clean', function (callback) {
  return del(['./css', './img', './js'], callback);
});

gulp.task('sass', function() {
  return buildSass()
    .pipe(gulp.dest('./css/'))
    .pipe(reload({stream: true}));
});

function buildSass() {
  return gulp.src('./src/css/main.scss')
    .pipe(sass())
    .on('error', function(err) {
      // don't crash, just log the error!
      console.log('Error when processing CSS!');
      console.log(err);
      browserSync.notify('Error when processing CSS!');
      this.emit('end');
    })
    .pipe(autoprefixer({ browsers: ['last 2 version'] }))
    .pipe(concat('style.css'));

}

gulp.task('vendor', function() {
  return buildVendor()
    .pipe(streamify(uglify()))
    .pipe(gulp.dest('./js'));
});

function buildVendor() {
  return browserify()
    .require('lodash')
    .require('angular')
    .require('angular-route')
    .require('angular-animate')
    .bundle()
    .pipe(source('vendor.js'));
}

gulp.task('watch', function () {
  var bundler = watchify(browserify({ cache: {}, packageCache: {}, fullPaths: true, debug: true}));

  browserSync({
    proxy: 'localhost:8888',
    port: 8080,
    open: false
  });

  gulp.watch('src/**/*.scss', ['sass']);
  gulp.watch(['src/**/*.html', 'src/**/*.css', 'src/**/*.jpg', 'src/vid/*.*'], ['copy-static-files']);
  gulp.watch(['src/**/*.svg'], ['process-svg']);
  gulp.watch('src/**/*.png', ['process-png']);

  bundler
    .add('./src/js/main.js')
    .external('lodash')
    .external('angular')
    .external('angular-route')
    .external('angular-animate')
    .transform(jadeify)
    .on('update', rebundle);
  return rebundle();

  function rebundle() {
    return bundler.bundle()
      .on('error', function(err) {
        console.log('Browserify Error');
        console.log(err.message);
        console.log(err.stack);
      })
      .pipe(source('main.js'))
      .pipe(gulp.dest('./js'))
      //.pipe(gzip())
      .pipe(reload({stream: true, once: true}));
  }
});
gulp.task('process-static-files', function () {
  runSequence(['copy-static-files', 'process-png', 'process-svg']);
});

gulp.task('copy-static-files', function() {
  return gulp.src(['./src/**/*.html', './src/**/*.css', 'src/**/*.jpg', 'src/**/*.mp4'])
    .pipe(gulp.dest('./'))
    .pipe(reload({stream: true}));
});

gulp.task('process-png', function() {
  return gulp.src(['./src/**/*.png'])
    .pipe(pngquant({quality: '65-80', speed: 4 })())
    .pipe(gulp.dest('.'));
});

gulp.task('process-svg', function() {
  return gulp.src(['./src/img/icons/*.svg'])
    .pipe(svgmin())
    .pipe(svgstore())
    .pipe(gulp.dest('./img'));
});

gulp.task('karma', function() {
  var karma = require('karma');
  var root = path.resolve('./');
  return karma.server.start({
    basePath: root,
    configFile: path.join(root, './karma.conf.js')
  });
});

gulp.task('connect', function() {
  connect.server({
    port: 8888
  });
});

gulp.task('default', function() {
  runSequence('clean', 'build', 'karma');
});

gulp.task('build',
  ['vendor', 'watch', 'sass', 'process-static-files', 'connect']
);
