(function() {

  angular
    .module('octoLabs')
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider.state({
      name: 'app.results',
      url: '/results?q&fips',
      views: {
        '': {
          templateUrl: 'app/views/results/results.html',
          controller: 'ResultsController'
        }
      },
      resolve: {
          countyData: function(Restangular, $stateParams) {
              return Restangular.one('api').customGET('search',{'q':$stateParams.q});
          },
          populationData: function(Restangular, $stateParams) {
              return Restangular.one('api').customGET('getPopulationInfo',{'q':$stateParams.fips});
          },
          housingData: function(Restangular, $stateParams) {
              return Restangular.one('api').customGET('getHousingInfo',{'q':$stateParams.fips});
          }
      }
    });
  }

})();
