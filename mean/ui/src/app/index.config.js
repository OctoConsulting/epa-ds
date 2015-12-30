/*global location */
(function() {

  angular
    .module('octoLabs')
    .config(config);

  /** @ngInject */

  function config($logProvider, RestangularProvider, $locationProvider, $urlRouterProvider, cfpLoadingBarProvider) {

    // Enable log
    $logProvider.debugEnabled(true);
    
    /* Configure the route that will be default if a bad route is typed in */
    $urlRouterProvider.otherwise( '/' );

    /* Set up a base url for our REST calls, Dev and Production */
    if(location.hostname === 'localhost') {
      RestangularProvider.setBaseUrl('http://ec2-54-152-40-248.compute-1.amazonaws.com');
    }
    else {
      RestangularProvider.setBaseUrl(location.protocol + '//' + location.hostname + (location.port && ':' + location.port) + location.pathname);
    }
    
    /* Configure some default settings for the loading bar */
    cfpLoadingBarProvider.latencyThreshold = 30;
    cfpLoadingBarProvider.includeSpinner = false;

  }

})();
