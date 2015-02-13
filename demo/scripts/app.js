'use strict';

angular.module('satelliteDemoApp', [
    'ngRoute', 'ngSanitize', 'ngTouch',
    'angular-satellite'
])
    .config([
        '$routeProvider', '$locationProvider', '$compileProvider',
        function($routeProvider, $locationProvider, $compileProvider) {

            //can't use this with github pages / if don't have access to the server
            $locationProvider.html5Mode(false);

            $routeProvider.when('/home', {
                templateUrl: 'scripts/home/home.html'
            });

            $routeProvider.otherwise({
                redirectTo: '/home'
            });
        }
    ])
;