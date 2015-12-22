(function() {

  angular.module('<%= scriptAppName %>')
    .directive('<%= cameledName %>', /** @ngInject */ function () {
      return {
        template: '<div></div>',
        restrict: 'EA',
        link: function (scope, element/*, attrs*/) {
          element.text('this is the <%= cameledName %> directive');
        }
      };
    });
    
})();
