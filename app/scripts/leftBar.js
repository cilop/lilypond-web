(function() {
  var leftBar;

  leftBar = angular.module('leftBar', ['musicSVG']);

  leftBar.directive('leftBar', function() {
    return {
      restrict: 'A',
      require: 'ngModel',
      scope: true,
      template: '<svg class="left-bar staff" width="128" height="64" viewBox="0 -4 16 8"> <line ng-line width="16"/> <g ng-key-signature ng-show="score.meta.key !== undefined" value="{{score.meta.key}}" x="4" y="0"/> <g ng-time-signature ng-show="score.meta.time !== undefined" top="{{score.meta.time.n}}" bottom="{{score.meta.time.d}}" x="12"/> </svg> <br> <svg class="left-bar staff" width="128" height="64" viewBox="0 -4 16 8"> <g ng-staff width="16"/> <path ng-path ng-show="score.staves[0].clef !== undefined" name="{{score.staves[0].clef}}Clef" x="1" y="1"/> <g ng-key-signature ng-show="score.meta.key !== undefined" value="{{score.meta.key}}" x="4" y="-0.5"/> <g ng-time-signature ng-show="score.meta.time !== undefined" top="{{score.meta.time.n}}" bottom="{{score.meta.time.d}}" x="12"/> </svg>'
    };
  });

}).call(this);
