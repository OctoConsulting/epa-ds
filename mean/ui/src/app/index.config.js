/*global location */
(function() {

  angular
    .module('octoLabs')
    .config(config);

  /** @ngInject */

  function config($logProvider, RestangularProvider, $locationProvider, $urlRouterProvider, cfpLoadingBarProvider) {

    // Enable log
    $logProvider.debugEnabled(true);
    
    //RestangularProvider.setBaseUrl('/api');

    $urlRouterProvider.otherwise( '/' );
    if(location.hostname === 'localhost') {
      RestangularProvider.setBaseUrl('http://ec2-54-152-40-248.compute-1.amazonaws.com');
    }
    else {
      RestangularProvider.setBaseUrl(location.protocol + '//' + location.hostname + (location.port && ':' + location.port) + location.pathname);
    }
    
    $locationProvider.html5Mode(true);

    cfpLoadingBarProvider.latencyThreshold = 30;
    cfpLoadingBarProvider.includeSpinner = false;

  }

})();
