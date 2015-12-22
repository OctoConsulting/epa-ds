/*global location */
(function() {

  angular
    .module('octoLabs')
    .config(config);

  /** @ngInject */

  function config($logProvider, RestangularProvider, $locationProvider, $urlRouterProvider) {

    // Enable log
    $logProvider.debugEnabled(true);
    
    //RestangularProvider.setBaseUrl('/api');

    $urlRouterProvider.otherwise( '/' );
    RestangularProvider.setBaseUrl(location.protocol + '//' + location.hostname + (location.port && ':' + 3000) + '/inflo');


    $locationProvider.html5Mode(true);

  }

})();
