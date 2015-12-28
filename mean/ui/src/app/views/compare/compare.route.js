(function() {

  angular
    .module('octoLabs')
    .config(routeConfig);

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
          populationData: function(Restangular, $stateParams, countyData) {
              return Restangular.one('api').customGET('getPopulationInfo',{'q':countyData.stfips});
          },
          housingData: function(Restangular, $stateParams, countyData) {
              return Restangular.one('api').customGET('getHousingInfo',{'q':countyData.stfips});
          }
      }
    });
  }

})();
