(function() {

  angular.module('octoLabs')
    .controller('BodyController', /** @ngInject */ function ($scope, $state) {
			$scope.$state = $state;
		})
		.controller('MainController', /** @ngInject */ function ($scope, Restangular, $state, $filter) {
			$scope.hasError = 0;
			$scope.comparing = false;

      $scope.search = function () {
          $state.transitionTo('app.compare', {'query':$scope.query,'queryCompare':$scope.queryCompare});
          /*
          $scope.loginLoading = true;
          Restangular.one('api').customGET('search',{'q':$scope.query})
          .then(function(result) {
              $scope.loginLoading = false;
              //$scope.hasError = 0;
              $state.transitionTo('app.compare', {'query':$scope.query,'queryCompare':$scope.queryCompare});
          }, function() {
              $scope.loginLoading = false;
              //$scope.hasError = 1;
          });
				*/
      };

      $scope.getLocation = function(val) {
          $scope.hasError = 0;
          return Restangular.one('api').customGET('autoComplete',{'q':val})
          .then(function(result) {
              result.results = $filter('unique')(result.results);
              return result.results.map(function(item){
                  return item;
              });

          }, function() {
              
          });
      };

      $scope.onSelect = function ($item, $model, $label) {
          // Auto search on click
      };
    });

})();
