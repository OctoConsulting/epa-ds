(function() {

  angular.module('octoLabs')
      .controller('ResultsController', /** @ngInject */ function ($scope, Restangular, $state, $filter, $stateParams, toastr, countyData, populationData, housingData) {
            $scope.queryShow = $stateParams.query;
            $scope.query = $stateParams.query;
            $scope.countyData = countyData;
            $scope.comparing = false;

            $scope.housingData = housingData;
            $scope.populationData = populationData;

            $scope.gender = {};
            $scope.gender.data = [{label: "Female",value: $scope.populationData.sex.female.number},{label: "Male", value: $scope.populationData.sex.male.number}];

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

            $scope.owner = {};
            $scope.owner.data = [{ y: 'owner', a: $scope.housingData.ownerOccupancy.number, b: $scope.housingData.rentalOccupancy.number}];

            $scope.occupied = {};
            $scope.occupied.data = [{ y: 'occupied', a: $scope.housingData.vacancy.number, b: $scope.housingData.occupancy.number}];



            $scope.search = function () {
              if($scope.comparing) {
                if(!$scope.query || !$scope.queryCompare) {
                  toastr.error("Please select two counties to compare.");
                  return false;
                }
                else {
                  $state.transitionTo('app.compare', {'query':$scope.query,'queryCompare':$scope.queryCompare}, {'reload':true});
                }
              }
              else {
                if(!$scope.query) {
                  toastr.error("Please select a county to search for.");
                  return false;
                }
                else {
                  $state.transitionTo('app.results', {'query':$scope.query}, {'reload':true});
                }

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
