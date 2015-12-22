(function() {

  angular
    .module('octoLabs')
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($urlRouterProvider, $stateProvider) {
    $stateProvider.state('app', {
      url: '',
      abstract: true,
      views: {
        '': {
          template: "<div ui-view></div>"
        },
        'header': {
          templateUrl: 'app/views/header/header.html',
          controller: 'HeaderController',
          controllerAs: 'header'
        },
        'footer': {
          templateUrl: 'app/views/footer/footer.html',
          controller: 'FooterController',
          controllerAs: 'footer'
        }
      }
    });

    $urlRouterProvider.when('', '/').otherwise('/');
  }

})();
