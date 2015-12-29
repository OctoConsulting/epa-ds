(function() {

  angular.module('octoLabs').directive('countySpaces', function() {
    return {
      require: 'ngModel',
      link: function(scope, element, attrs, ngModel) {
        ngModel.$parsers.push(function(data) {
          //convert data from view format to model format
          if(data) {
            return data.replace(/\,\ /g, '\,'); //converted  
          }
          
        });

        ngModel.$formatters.push(function(data) {
          //convert data from model format to view format
          if(data) {
            return data.replace(/\,/g, '\,\ '); //converted
          }
          
        });
      }
    }
  });
})();
