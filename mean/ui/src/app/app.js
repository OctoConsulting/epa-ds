(function(){
    'use strict';
    
    angular
        .module( 'app', [
            'templates-app',
            'templates-common',
            'ui.router',
            'ui.bootstrap',
            'restangular',
            'angular.filter',
            'angular-chartist',
            'angular-ladda',
            'stpa.morris'
        ])

        .config( function initRoutes ($urlRouterProvider, $stateProvider, RestangularProvider, $provide, laddaProvider) {
            $urlRouterProvider.otherwise( '/' );
             RestangularProvider.setBaseUrl(location.protocol + '//' + location.hostname + (location.port && ':' + location.port) + location.pathname);
            $provide.decorator('$uiViewScroll', function ($delegate, $stateParams, $location, $document) {
                return function (uiViewElement) {
                    $document.scrollTop(0, 0);
                };
            });
            laddaProvider.setOption({ 
              style: 'zoom-in'
            });            
        })

        .controller( 'AppController', function AppController ($scope, $state, $location,  appName, appVersion) {
            $scope.appName = appName;
            $scope.appVersion = appVersion;
        })
        .constant('appName', 'Octo | Know Your Neighborhood')
        .constant('appVersion', '1.0.0')
        .run( function initApplication ($rootScope, $state) {
                $rootScope.$state = $state;

        });
        /*        
        .run( function initApplication ($httpBackend) {
            var myData = {"stfips":"1001","county_name":"Barbour County","state":"AL","overall_result":"0.0041379"};
           
            $httpBackend.whenGET(location.protocol + '//' + location.hostname + (location.port && ':' + location.port) + location.pathname + 'api/search?q=test').respond(function(method, url, data) {
                return [200, myData, {}];
            });
        
            var myData2 = {"stfips":"1002","county_name":"Alexandria","state":"VA","overall_result":"0.0081379"};
           
            $httpBackend.whenGET(location.protocol + '//' + location.hostname + (location.port && ':' + location.port) + location.pathname + 'api/search?q=Alexandria').respond(function(method, url, data) {
                return [200, myData2, {}];
            });

            $httpBackend.whenGET(/./).passThrough();

        });
        */
})();

