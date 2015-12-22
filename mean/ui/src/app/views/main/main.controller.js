(function() {

  angular.module('octoLabs')
    .controller('BodyController', /** @ngInject */ function ($scope, $state) {
			$scope.$state = $state;
		})
		.controller('MainController', /** @ngInject */ function () {
		  
    });

})();
