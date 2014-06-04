'use strict';

angular.module('lilypondWebApp',['ngRoute', 'leftBar', 'documentView', 'data', 'actions', 'lyGenerator'])
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
    .when('/download', {
      templateUrl: 'partials/download',
      controller: 'DownloadCtrl'
    })
    .otherwise({
      redirectTo: '/'
    });
    
  $locationProvider.html5Mode(true);
})

.controller('MainCtrl', function($scope, data, Actions, generateLy){

  $scope.lycode = '\include "english.ly" music = { \clef treble \key c \major \\time 4/4 } \score { \\new Staff = "music" \music }';
  $scope.score = new data.Score;
  $scope.cursor = new data.Cursor($scope.score);
  $scope.actions = new Actions($scope.score, $scope.cursor);
  $scope.selectedKeyboard = 'qwerty';
  $scope.buttonDisplay = function(key) {
    if ($scope.selectedKeyboard === 'qwerty') {
      key = $scope.actions.qwertyToDvorak(key);
    }
    return $scope.actions.buttonDisplays[$scope.actions.bindings[key]] || '';
  };
  $scope.keydown = function(event) {
    var _base, _name;
    console.log(event.which);
    return typeof (_base = $scope.actions.keybindings[$scope.selectedKeyboard])[_name = event.which] === "function" ? _base[_name]() : void 0;
  };
  $scope.keyboardLayout = [";,.pyfgcrl".split(''), "aoeuidhtns".split(''), "'qjkxbmwvz".split('')];

  $scope.buttonDisplay = function(key) {
    return $scope.actions.buttonDisplays[$scope.actions.bindings[key]] || '-';
  };

  $scope.$on('dataChanged', function() {
    $scope.$digest();
    $scope.lycode = generateLy($scope.score);
  });

  return $scope.leftBarModel = {
    key: 0,
    time: {
      top: 4,
      bottom: 4
    },
    staves: [
      {
        clef: 'treble'
      }
    ]
  };

});
