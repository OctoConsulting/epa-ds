(function() {

  angular.module('octoLabs')
    .controller('BodyController', /** @ngInject */ function ($scope, $state) {
			$scope.$state = $state;
		})
		.controller('MainController', /** @ngInject */ function ($scope, Restangular, $state, $filter, toastr, topFives) {

			// Set default variables for this page
			$scope.hasError = 0;
			$scope.fullSearchBar=true;
			$scope.comparing = false;

			// Massage top five data
			$scope.topFives = {};
			if(topFives.length) {
				$scope.topFives.air = topFives[0].Air;
				$scope.topFives.water = topFives[1].Water;
				$scope.topFives.built = topFives[2].Built;
				$scope.topFives.socio = topFives[3].Sociodemographic;				
			}

			// Allow top five counties to be linked
      $scope.showCounty = function (row) {
        $state.go('app.results', { 'query': row.countyDescription+','+row.stateCode});
      }

      // Function to power the search bar
      $scope.search = function () {

      	// Check to see if we're in a comparison search
      	if($scope.comparing) {

      		// Make sure they have two counties selected for a comparison search. Go to comparison page or show an error.
					if(!$scope.query || !$scope.queryCompare) {
						toastr.error("Please select two counties to compare.");
						return false;
					}
	      	else {
						$state.transitionTo('app.compare', {'query':$scope.query,'queryCompare':$scope.queryCompare});
	      	}
      	}
      	else {
      		// Make sure they have a county selected. Show results page or show an error.
	      	if(!$scope.query) {
	      		toastr.error("Please select a county to search for.");
	      		return false;
	      	}
					else {
						$state.transitionTo('app.results', {'query':$scope.query});
	     		}

	      }      	
      };

      // Function to fetch county suggestions and massage the data for the typeahead module
      $scope.getLocation = function(val) {
          $scope.hasError = 0;
          return Restangular.one('api').withHttpConfig({ignoreLoadingBar: true}).customGET('autoComplete',{'q':val})
          .then(function(result) {
              result.results = $filter('unique')(result.results);
              return result.results.map(function(item){
                  return item;
              });

          }, function() {
              
          });
      };


    });

})();
