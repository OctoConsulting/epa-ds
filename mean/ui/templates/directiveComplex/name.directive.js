(function() {

  angular.module('<%= scriptAppName %>')
    .directive('<%= cameledName %>', /** @ngInject */ function () {
      return {
        templateUrl: '<%= htmlUrl %>',
        restrict: 'EA',
        link: function (/* scope, element, attrs */) {
        }
      };
    });
    
})();
