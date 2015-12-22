(function() {

  angular.module('octoLabs')
		.controller('ResultsController', /** @ngInject */ function ($scope, Restangular, countyData, $state, populationData, housingData) {
      $scope.countyData = countyData;
      $scope.housingData = housingData; //{"total":104061,"vacancy":{"number":30881,"percent":29},"occupancy":{"number":73180,"percent":70},"rentalOccupancy":{"number":34135,"percent":32},"ownerOccupancy":{"number":53071,"percent":50}};
      $scope.populationData = populationData; //{"race":{"white":{"number":156153,"percent":85.67},"black":{"number":17105,"percent":9.38},"americanIndianAlaskaNative":{"number":1216,"percent":0.67},"asian":{"number":1348,"percent":0.74},"nativeHawaiian":{"number":89,"percent":0.05},"otherRace":{"number":3631,"percent":1.99},"twoOrMore":{"number":2723,"percent":1.49}},"sex":{"male":{"number":89196,"percent":48.94},"female":{"number":93069,"percent":51.06}},"total":182265};

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
		  
    });

})();
