(function() {

  angular.module('<%= scriptAppName %>')
    .controller('<%= classedName %>Controller', /** @ngInject */ function ($scope) {
      $scope.message = 'Hello';
    });
    
})();
