(function() {

  angular.module('octoLabs')
    .controller('BodyController', /** @ngInject */ function ($scope, $state) {
			$scope.$state = $state;
		})
		.controller('MainController', /** @ngInject */ function ($scope, Restangular, $state, $filter, toastr, topFives) {
			$scope.hasError = 0;
			$scope.comparing = false;
			$scope.topFives = {};
			if(topFives.length) {
				$scope.topFives.air = topFives[0].Air;
				$scope.topFives.water = topFives[1].Water;
				$scope.topFives.built = topFives[2].Built;
				$scope.topFives.socio = topFives[3].Sociodemographic;				
			}


      $scope.search = function () {
      	if(!$scope.query && !$scope.queryCompare) {
      		toastr.error("Please select a county to search for.");
      		return false;
      	}
      	else if(!$scope.query && $scope.queryCompare) {
      		toastr.error("Please select two counties to compare.");
      		return false;
      	}
      	else if($scope.query && !$scope.queryCompare) {
					$state.transitionTo('app.results', {'query':$scope.query});
      	}
      	else if($scope.query && $scope.queryCompare) {
					$state.transitionTo('app.compare', {'query':$scope.query,'queryCompare':$scope.queryCompare});
      	}      	
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
