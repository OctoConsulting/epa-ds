'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');

var browserSync = require('browser-sync');

function isOnlyChange(event) {
  return event.type === 'changed';
}

gulp.task('mockapi', function() {
  var dest = path.join(conf.paths.tmp, '/serve/api');
  var src = path.join(conf.paths.mockapi, '/**/*.json');
  return gulp
    .src(src)
    .pipe(gulp.dest(dest))
    .pipe(browserSync.reload({ stream: true }));
});

gulp.task('watch', ['fonts','inject', 'mockapi'], function () {

  gulp.watch([path.join(conf.paths.src, '/*.html'), 'bower.json'], ['inject']);
  gulp.watch([path.join(conf.paths.mockapi, '/**/*.json')], ['mockapi']);
  gulp.watch([
    path.join(conf.paths.src, '/app/**/*.css'),
    path.join(conf.paths.src, '/app/**/*.less')
  ], function(event) {
    if(isOnlyChange(event)) {
      gulp.start('styles');
    } else {
      gulp.start('inject');
    }
  });

  gulp.watch(path.join(conf.paths.src, '/app/**/*.js'), function(event) {
    if(isOnlyChange(event)) {
      gulp.start('scripts');
    } else {
      gulp.start('inject');
    }
  });

  gulp.watch(path.join(conf.paths.src, '/app/**/*.html'), function(event) {
    browserSync.reload(event.path);
  });
});
