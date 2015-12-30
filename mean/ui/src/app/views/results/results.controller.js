(function() {

  angular.module('octoLabs')
      .controller('ResultsController', /** @ngInject */ function ($scope, Restangular, $state, $filter, $stateParams, toastr, countyData, populationData, housingData) {
           
            // Set default variables for this page
            $scope.queryShow = $stateParams.query;
            $scope.query = $stateParams.query;
            $scope.countyData = countyData;
            $scope.comparing = false;
            $scope.housingData = housingData;
            $scope.populationData = populationData;

            // Massage data for chart module
            $scope.gender = {};
            $scope.gender.data = [{label: "Female",value: $scope.populationData.sex.female.number},{label: "Male", value: $scope.populationData.sex.male.number}];

            // Massage data for chart module
            $scope.race = {};
            $scope.race.data = [
                { key: 'White', percent: $scope.populationData.race.white.percent, number: $scope.populationData.race.white.number},
                { key: 'Black', percent: $scope.populationData.race.black.percent, number: $scope.populationData.race.black.number},
                { key: 'Alaskan Native', percent: $scope.populationData.race.americanIndianAlaskaNative.percent, number: $scope.populationData.race.americanIndianAlaskaNative.number},
                { key: 'Asian', percent: $scope.populationData.race.asian.percent, number: $scope.populationData.race.asian.number},
                { key: 'Hawaiian Native', percent: $scope.populationData.race.nativeHawaiian.percent, number: $scope.populationData.race.nativeHawaiian.number},
                { key: 'Other', percent: $scope.populationData.race.otherRace.percent, number: $scope.populationData.race.otherRace.number},
                { key: 'Two or More', percent: $scope.populationData.race.twoOrMore.percent, number: $scope.populationData.race.twoOrMore.number}
            ];

            // Massage data for chart module
            $scope.owner = {};
            $scope.owner.data = [{ y: 'owner', a: $scope.housingData.ownerOccupancy.number, b: $scope.housingData.rentalOccupancy.number}];

            // Massage data for chart module
            $scope.occupied = {};
            $scope.occupied.data = [{ y: 'occupied', a: $scope.housingData.vacancy.number, b: $scope.housingData.occupancy.number}];

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
