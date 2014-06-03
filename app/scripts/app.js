'use strict';

// angular.module('lilypondWebApp', [
//   'ngRoute',
//   'documentView',
//   'data',
//   'actions',
//   'lyGenerator'
//   'leftBar',
// ])
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

.controller('MainCtrl', function($scope, data, dataFactory, Actions, generateLy){


  $scope.lycode = '';
  $scope.score = new data.Score;
  $scope.cursor = new data.Cursor($scope.score);
  $scope.actions = new Actions($scope.score, $scope.cursor, $scope);
  $scope.keyboardLayout = [";,.pyfgcrl".split(''), "aoeuidhtns".split(''), "'qjkxbmwvz".split('')];

  $scope.buttonDisplay = function(key) {
    return $scope.actions.buttonDisplays[$scope.actions.bindings[key]] || '-';
  };

  $scope.$on('leftChange', function(value) {
    var key, timeSig;
    timeSig = value.targetScope.ngModel.time;
    key = value.targetScope.ngModel.key;
    return dataFactory.meta.measures[0].events.time = {
      n: timeSig.top,
      d: timeSig.bottom,
      key: key
    };
  });

  $scope.$on('dataChanged', function() {
    console.log(generateLy($scope.score));
    $scope.$digest();
    $scope.lycode = generateLy($scope.score);
  });

  $scope.click = function(event) {
    var key;
    key = event.target.className;
    return helper.animateKey(key);
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

.factory('dataFactory', function() {
    var barline, clef, data, duration, events, key, measure, measures, meta, note, notes, pitch, staff, staves, time;
    pitch = 52;
    clef = 'treble';
    barline = 'some string';
    time = {
      n: 3,
      d: 4
    };
    key = -3;
    data = {};
    duration = {};
    note = {
      pitch: pitch,
      duration: duration
    };
    events = {
      clef: clef
    };
    notes = [note];
    measure = {
      events: events,
      notes: notes
    };
    measures = [measure];
    staff = {
      measures: measures
    };
    staves = [staff];
    data.staves = staves;
    events = {
      key: key,
      time: time,
      barline: barline
    };
    measure = {
      events: events
    };
    measures = [measure];
    meta = {
      measures: measures
    };
    data.meta = meta;
    return data;
  })