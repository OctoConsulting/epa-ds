'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');

var browserSync = require('browser-sync');
var browserSyncSpa = require('browser-sync-spa');

var util = require('util');

var proxyMiddleware = require('http-proxy-middleware');

function browserSyncInit(baseDir, browser, disableSync, cb) {
  browser = browser === undefined ? 'default' : browser;

  var routes = null;
  if(baseDir === conf.paths.src || (util.isArray(baseDir) && baseDir.indexOf(conf.paths.src) !== -1)) {
    routes = {
      '/bower_components': 'bower_components'
    };
  }

  var server = {
    baseDir: baseDir,
    routes: routes
  };

  /*
   * You can add a proxy to your backend by uncommenting the line bellow.
   * You just have to configure a context which will we redirected and the target url.
   * Example: $http.get('/users') requests will be automatically proxified.
   *
   * For more details and option, https://github.com/chimurai/http-proxy-middleware/blob/v0.0.5/README.md
   */
  // server.middleware = proxyMiddleware('/users', {target: 'http://jsonplaceholder.typicode.com', proxyHost: 'jsonplaceholder.typicode.com'});

  var bsParams = {
    startPath: '/',
    server: server,
    browser: browser,
    port:3333
  };

  // http://stackoverflow.com/questions/27579007/how-to-temporarily-disable-browsersync
  if (disableSync) {
    bsParams.snippetOptions = {
      rule: {
        match: /qqqqqqqqq/
      }
    };
  }

  browserSync.instance = browserSync.init(bsParams, cb);
}

browserSync.use(browserSyncSpa({
  selector: '[ng-app]'// Only needed for angular apps
}));

gulp.task('serve', ['watch'], function (cb) {
  browserSyncInit([path.join(conf.paths.tmp, '/serve'), conf.paths.src], undefined, false, cb);
});

gulp.task('serve:dist', ['build'], function (cb) {
  browserSyncInit(conf.paths.dist, undefined, false, cb);
});

gulp.task('serve:e2e', ['inject'], function (cb) {
  browserSyncInit([conf.paths.tmp + '/serve', conf.paths.src], [], true, cb);
});

gulp.task('serve:e2e-dist', ['build'], function (cb) {
  browserSyncInit(conf.paths.dist, [], true, cb);
});
