(function() {

  angular
    .module('octoLabs')
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider.state({
      name: 'app.compare',
      url: '/compare',
      views: {
        '': {
          templateUrl: 'app/views/compare/compare.html',
          controller: 'CompareController'
        }
      }
      // resolve: {
      //     countyData: function(Restangular, $stateParams) {
      //         return Restangular.one('api').customGET('search',{'q':$stateParams.q});
      //     },
      //     populationData: function(Restangular, $stateParams) {
      //         return Restangular.one('api').customGET('getPopulationInfo',{'q':$stateParams.fips});
      //     },
      //     housingData: function(Restangular, $stateParams) {
      //         return Restangular.one('api').customGET('getHousingInfo',{'q':$stateParams.fips});
      //     }
      // }
    });
  }

})();
