(function() {

  angular
    .module('octoLabs')
    .config(routeConfig);

  /* Comparison page route and data resolvers */

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider.state({
      name: 'app.compare',
      url: '/compare?query&queryCompare',
      views: {
        '': {
          templateUrl: 'app/views/compare/compare.html',
          controller: 'CompareController'
        }
      },
      resolve: {
          countyData: function(Restangular, $stateParams) {
              return Restangular.one('api').customGET('search',{'q':$stateParams.query});
          },
          countyDataCompare: function(Restangular, $stateParams) {
              return Restangular.one('api').customGET('search',{'q':$stateParams.queryCompare});
          }
      }
    });
  }

})();
