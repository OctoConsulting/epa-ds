(function() {

  angular
    .module('octoLabs')
    .run(runBlock);

  /** @ngInject */
  function runBlock(Restangular, errorHandler) {
    Restangular.setErrorInterceptor(function(response) {
        if(response.status >= 400) {
            errorHandler.showErrorMessage(response);
            // error handled
            return false;
        }        
        // error not handled
        return true;
    });
  }

})();
