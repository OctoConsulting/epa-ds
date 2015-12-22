(function() {

  angular.module('<%= scriptAppName %>')
    .config( /** @ngInject */ function ($provide) {
      $provide.decorator('<%= cameledName %>', function ($delegate) {
        // decorate the $delegate
        return $delegate;
      });
    });
    
});
