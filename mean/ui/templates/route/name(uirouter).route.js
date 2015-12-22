(function() {

  angular.module('<%= scriptAppName %>')
    .config(/** @ngInject */ function ($stateProvider) {
      $stateProvider
        .state('<%= name %>', {
          url: '<%= route %>',
          templateUrl: '<%= htmlUrl %>',
          controller: '<%= classedName %>Controller'
        });
    });
    
})();
