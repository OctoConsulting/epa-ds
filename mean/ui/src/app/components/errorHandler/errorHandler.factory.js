(function() {

  angular.module('octoLabs')
    .factory('errorHandler', /** @ngInject */ function (toastr) {
      // Service logic
      // ...

      function getErrorMessage (code) {
        var errorMessage = {};
        var errorMessages = {
          '400': function () {
            errorMessage.title = code + ' Bad Request';
            errorMessage.message = 'The request was invalid or cannot be otherwise served.';
          },
          '401': function () {
            errorMessage.title = code + ' Unauthorized';
            errorMessage.message = 'Authentication credentials were missing or incorrect.';
          },
          '403': function () {
            errorMessage.title = code + ' Forbidden';
            errorMessage.message = 'The request is understood, but it has been refused or access is not allowed';
          },
          '404': function () {
            errorMessage.title = code + ' Not Found';
            errorMessage.message = 'The URI requested is invalid or the resource requested.';
          },
          '406': function () {
            errorMessage.title = code + ' Not Acceptable';
            errorMessage.message = 'An invalid format was specified in the request.';
          },
          '410': function () {
            errorMessage.title = code + ' Gone';
            errorMessage.message = 'This resource is no longer found at this endpoint. Please refer to our updated api documentation.';
          },                       
          '500': function () {
            errorMessage.title = code + ' Internal Server Error';
            errorMessage.message = 'There was a problem with the service request.';
          },
          '502': function () {
            errorMessage.title = code + ' Service Unavailable';
            errorMessage.message = 'Services are down for maintenance.';
          },
          '503': function () {
            errorMessage.title = code + ' Bad Gateway';
            errorMessage.message = 'Services are up but overloaded with requests. Try again later.';
          },
          '504': function () {
            errorMessage.title = code + ' Gateway Timeout';
            errorMessage.message = 'Servers are up but one or more services did not respond. Try again later.';
          },
          'default': function () {
            errorMessage.title = 'Unknown Error';
            errorMessage.message = 'An error has occurred during your request. Please contact support if this continues.';
          }
        };
          
        // invoke it
        (errorMessages[code] || errorMessages['default'])();
          
        // return values
        return errorMessage;
      }      

      // Public API here
      return {
        showErrorMessage: function (response) {
          var currentError = getErrorMessage(response.status);
          toastr.error(currentError.message, currentError.title);
          return currentError;
        }
      };
    });
})();




