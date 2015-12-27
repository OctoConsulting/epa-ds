(function() {

  angular.module('octoLabs')
      .controller('CompareController', /** @ngInject */ function ($scope, $stateParams) {
      	$scope.query = $stateParams.query;
      	$scope.queryCompare = $stateParams.queryCompare;
      });

})();
