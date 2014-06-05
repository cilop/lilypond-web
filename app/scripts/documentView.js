(function() {
  var documentView;

  documentView = angular.module('documentView', ['musicSVG', 'actions']);

  documentView.directive('documentView', function() {
    return {
      restrict: 'A',
      scope: true,
      controller: function($scope, $element){
        $element.keydown(function(){
          $scope.$emit('dataChanged');
        });
      },
      template: '<div class="document"> <div class="staff"> <div ng-measure ng-repeat="measure in score.meta.measures" model="score" measure-num="$index" type="meta" measure="measure" class="measure" cursor="cursor" staff="-1"/> </div> <br> <div class="staff"> <div ng-measure ng-repeat="measure in score.staves[0].measures" model="score" measure-num="$index" type="staff" measure="measure" class="measure" cursor="cursor" staff="0"/> </div> </div>'
    };
  });

}).call(this);
