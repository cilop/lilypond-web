'use strict';

angular.module('lilypondWebApp',['ngRoute', 'leftBar', 'documentView', 'data', 'actions', 'lyGenerator'])
.config(function ($routeProvider, $locationProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'partials/main',
      controller: 'MainCtrl'
    })
    .when('/about', {
      templateUrl: 'partials/about'
    })
    .when('/demo', {
      templateUrl: 'partials/demo'
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

.controller('MainCtrl', function($scope, data, Actions, generateLy, $q){

  $scope.lycode = '\include "english.ly" music = { \clef treble \key c \major \\time 4/4 } \score { \\new Staff = "music" \music }';

  $scope.score = new data.Score();
  $scope.cursor = new data.Cursor($scope.score);
  $scope.actions = new Actions($scope.score, $scope.cursor);
  $scope.selectedKeyboard = 'dvorak';
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

  $scope.$on('dataChanged', function() {
    $scope.$digest();
    $scope.lycode = generateLy($scope.score);
  });


  $scope.loadFile = function(){
    
    console.log('Should load a file');
    $('#fileInput').on('change', function(){

      console.log('Inside');
      var file = $('#fileInput').get(0).files[0];
      var data = new FileReader();
      data.onloadend = function() {
        console.log('done loading');
        console.log(data.result);
      };
      var result = data.readAsText(file);

      console.log(result);
      console.log(file);
    });
    $('#fileInput').click();

  };

  $scope.saveFile = function(){
    console.log('Should save JSON');
  };

  $scope.saveLilyPond = function(){
    console.log('Should save LilyPond');
  };

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

})

.controller('DownloadCtrl', function($scope){

  var mac = (navigator.userAgent.toString().toLowerCase().indexOf('mac') !== -1) ? true: false;
  var win = (navigator.appVersion.indexOf('Win') !== -1) ? true : false;
  var linux = (navigator.appVersion.indexOf('Linux') !== -1) ? true : false;
  var os;

  if (mac) {
    os = 'Mac OS';
  } else if (win) {
    os = 'Windows';
  } else if (linux) {
    os = 'Linux';
  }

  $scope.os = os;

  $scope.download = function(os){

    os = os || $scope.os;
    var aTag = angular.element('#download');
    aTag.append('<form action="/getzip" method="post"><input name="os" value="' + os +'""></form>').children().submit();
    aTag.children().remove();

  };
  
});
