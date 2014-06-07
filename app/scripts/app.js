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
    .when('/web', {
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

.controller('MainCtrl', function($scope, data, Actions, generateLy, $http){

  var width = 1000;
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
    event.preventDefault();
    width += 200;
    $('.document-view').css({width: width});
    return typeof (_base = $scope.actions.keybindings[$scope.selectedKeyboard])[_name = event.which] === "function" ? _base[_name]() : void 0;
  };

  var changeHandler = function() {
    $scope.$digest();
    $scope.lycode = generateLy($scope.score);
  };

  $scope.$on('dataChanged', changeHandler);


  $scope.loadFile = function(){
    
    $('#fileInput').on('change', function(){

      var file = $('#fileInput').get(0).files[0];
      var reader = new FileReader();

      reader.onloadend = function() {
        var i, measure, staff, _i, _j, _k, _len, _len1, _len2, _ref, _ref1, _ref2;
        try {
          $scope.score = _(new data.Score()).extend(JSON.parse(reader.result));
        } catch (err) {
          alert('File input must be valid JSON');
          return;
        }
        _ref = $scope.score.meta.measures;
        for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
          measure = _ref[i];
          $scope.score.meta.measures[i] = _(new data.Measure()).extend(measure);
        }
        _ref1 = $scope.score.staves;
        for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
          staff = _ref1[_j];
          _ref2 = staff.measures;
          for (i = _k = 0, _len2 = _ref2.length; _k < _len2; i = ++_k) {
            measure = _ref2[i];
            staff.measures[i] = _(new data.StaffMeasure()).extend(measure);
          }
        }
        $scope.cursor = new data.Cursor($scope.score);
        $scope.actions = new Actions($scope.score, $scope.cursor);
        changeHandler();
        };

      reader.readAsText(file);
    });

    $('#fileInput').click();

  };

  $scope.saveFile = function(format){

    // alert(format);

    console.log('Should save JSON');
    var data;

    if (format === '.json') {
      data = angular.toJson($scope.score);
    } else {
      data = generateLy($scope.score);
    }



    var ts = new Date().getTime();

    $http({
      method: 'POST',
      url: '/savejson',
      data: {
        data: data,
        ts: ts,
        format: format
      }
    })
    .success(function(){
      console.log('Post successfull');
      console.log('Now posting new: ' + format + ts);
      angular.element('body').append('<form action="/gettrack" method="post"><input name="format" value="' + format + '"><input name="ts" value="' + ts + '"></form>').children().submit();
      angular.element('body').find('form').remove();
    })
    .error(function(){
      console.log('Post errorfull');
    });

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
