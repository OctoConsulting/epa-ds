(function() {

  angular
    .module('octoLabs')
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($urlRouterProvider, $stateProvider) {

    /* Configure the base application route and view */

    $stateProvider.state('app', {
      url: '',
      abstract: true,
      views: {
        '': {
          template: "<div ui-view></div>"
        }
      }
    });

    $urlRouterProvider.when('', '/').otherwise('/');
  }

})();
