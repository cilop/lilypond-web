(function() {
  var leftBar;

  leftBar = angular.module('leftBar', ['musicSVG']);

  leftBar.directive('leftBar', function() {
    return {
      restrict: 'A',
      require: 'ngModel',
      scope: {
        ngModel: '='
      },
      template: '<svg class="left-bar staff" width="128" height="64" viewBox="0 -4 16 8"> <line ng-line width="16"/> <g ng-key-signature value="{{ngModel.key}}" x="4" y="0"/> <g ng-time-signature top="{{ngModel.time.top}}" bottom="{{ngModel.time.bottom}}" x="12"/> </svg> <br> <svg class="left-bar staff" width="128" height="64" viewBox="0 -4 16 8"> <g ng-staff width="16"/> <path ng-path name="trebleClef" x="1" y="1"/> <g ng-key-signature value="{{ngModel.key}}" x="4" y="-0.5"/> <g ng-time-signature top="{{ngModel.time.top}}" bottom="{{ngModel.time.bottom}}" x="12"/> </svg>',
      link: function($scope) {
        return $scope.$watch('ngModel', function() {
          return $scope.$emit('leftChange', $scope.ngModel);
        }, true);
      }
    };
  });

}).call(this);
