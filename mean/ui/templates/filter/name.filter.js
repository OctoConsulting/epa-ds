(function() {

  angular.module('<%= scriptAppName %>')
    .filter('<%= cameledName %>', /** @ngInject */ function () {
      return function (input) {
        return '<%= cameledName %> filter: ' + input;
      };
    });
    
})();
