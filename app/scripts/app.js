'use strict';

angular.module('lilypondWebApp', [
  'ngRoute',
  'documentView',
  'data',
  'actions'
])
.config(function ($routeProvider, $locationProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'partials/main',
      controller: 'MainCtrl'
    })
    .when('/about', {
      templateUrl: 'partials/about',
      controller: 'AboutCtrl'
    })
    .when('/demo', {
      templateUrl: 'partials/demo',
      controller: 'DemoCtrl'
    })
    .otherwise({
      redirectTo: '/'
    });
    
  $locationProvider.html5Mode(true);
});