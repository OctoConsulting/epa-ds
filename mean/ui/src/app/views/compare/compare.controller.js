(function() {

  angular.module('octoLabs')
      .controller('CompareController', /** @ngInject */ function ($scope, $stateParams) {
      	$scope.queryShow = $stateParams.query;
      	$scope.queryCompareShow = $stateParams.queryCompare;
      	$scope.query = $stateParams.query;
      	$scope.queryCompare = $stateParams.queryCompare;

		    $scope.search = function () {
		        $state.transitionTo('app.compare', {'query':$scope.query,'queryCompare':$scope.queryCompare});
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
