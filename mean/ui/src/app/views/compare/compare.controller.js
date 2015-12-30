(function() {

  angular.module('octoLabs')
      .controller('CompareController', /** @ngInject */ function ($scope, Restangular, $state, $filter, $stateParams, toastr, countyData, countyDataCompare) {
      	
        // Set default variables for this page
        $scope.queryShow = $stateParams.query;
      	$scope.queryCompareShow = $stateParams.queryCompare;
      	$scope.query = $stateParams.query;
      	$scope.queryCompare = $stateParams.queryCompare;
        $scope.comparing = true;
        $scope.countyData = countyData;
        $scope.countyDataCompare = countyDataCompare;

        // Allow county title to be linked
        $scope.showCounty = function (county) {
          $state.go('app.results', { 'query': county.county_name+','+county.state});
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
              $state.transitionTo('app.compare', {'query':$scope.query,'queryCompare':$scope.queryCompare}, {'reload':true});
            }
          }
          else {
            // Make sure they have a county selected. Show results page or show an error.
            if(!$scope.query) {
              toastr.error("Please select a county to search for.");
              return false;
            }
            else {
              $state.transitionTo('app.results', {'query':$scope.query}, {'reload':true});
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
