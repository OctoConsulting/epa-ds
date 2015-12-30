(function() {

  angular
    .module('octoLabs')
    .config(routeConfig);

  /*  Home page route and data resolvers */

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider.state({
      name: 'app.main',
      url: '/',
      views: {
        '': {
          templateUrl: 'app/views/main/main.html',
          controller: 'MainController'
        }
      },
      resolve: {
        topFives: function(Restangular, $stateParams) {
            return Restangular.one('api').one('topFives').getList();
        }
      }
    });
  }

})();
