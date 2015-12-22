(function() {

  angular.module('<%= scriptAppName %>')
    .factory('<%= cameledName %>', /** @ngInject */ function () {
      // Service logic
      // ...

      var meaningOfLife = 42;

      // Public API here
      return {
        someMethod: function () {
          return meaningOfLife;
        }
      };
    });
    
})();
