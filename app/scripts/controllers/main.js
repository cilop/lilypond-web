'use strict';

angular.module('lilypondWebApp')

.controller('DownloadCtrl', function($scope){

  var mac = (navigator.userAgent.toString().toLowerCase().indexOf('mac') !== -1) ? true: false;
  var win = (navigator.appVersion.indexOf('Win') !== -1) ? true : false;
  var linux = (navigator.appVersion.indexOf('Linux') !== -1) ? true : false;
  var os;

  if (mac) {
    os = 'Mac OS';
  } else if (win) {
    os = 'Microsoft Windows';
  } else if (linux) {
    os = 'Linux';
  }

  $scope.os = os;
  
});
