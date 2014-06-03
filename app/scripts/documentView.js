(function() {
  var documentView;

  documentView = angular.module('documentView', ['musicSVG', 'actions']);

  documentView.directive('documentView', function() {
    return {
      restrict: 'A',
      scope: {
        score: '=',
        cursor: '='
      },
      controller: [
        '$scope', '$element', '$compile', 'Actions', function($scope, $element, $compile, Actions) {
          $scope.addMeasure = function() {
            return $scope.score.addMeasure();
          };
          $scope.removeMeasure = function() {
            return $scope.score.removeMeasure($scope.cursor);
          };
          $scope.actions = new Actions($scope.score, $scope.cursor);
          $scope.model = {
            meta: {
              measures: [
                {
                  events: {
                    key: 7,
                    time: {
                      n: 4,
                      d: 4
                    }
                  }
                }, {
                  events: {
                    key: -7
                  }
                }
              ]
            },
            staves: [
              {
                measures: [
                  {
                    events: {
                      clef: 'treble'
                    },
                    notes: [
                      {
                        pitch: 5,
                        duration: {
                          n: 1,
                          d: 4
                        }
                      }, {
                        pitch: 6,
                        duration: {
                          n: 1,
                          d: 2
                        }
                      }, {
                        pitch: 7,
                        duration: {
                          n: 1,
                          d: 4
                        }
                      }
                    ]
                  }, {
                    events: {},
                    notes: [
                      {
                        pitch: 7,
                        duration: {
                          n: 1,
                          d: 2
                        }
                      }, {
                        pitch: 8,
                        duration: {
                          n: 1,
                          d: 4
                        }
                      }, {
                        pitch: 9,
                        duration: {
                          n: 1,
                          d: 4
                        }
                      }
                    ]
                  }
                ]
              }
            ]
          };
          
          return $element.keydown(function(event) {
            var action, key;
            key = helper.animateKey(event.which);
            $scope.$emit('dataChanged');

            if ((action = $scope.actions.keybindings[event.which]) != null) {
              action();
              $scope.$digest();
            }
          });
        }
      ],
      template: '<div class="document"> <div class="staff"> <div ng-measure ng-repeat="measure in score.meta.measures" model="score" measure-num="$index" type="meta" measure="measure" class="measure" cursor="cursor" staff="-1"/> </div> <br> <div class="staff"> <div ng-measure ng-repeat="measure in score.staves[0].measures" model="score" measure-num="$index" type="staff" measure="measure" class="measure" cursor="cursor" staff="0"/> </div> </div>',
    };
  });

}).call(this);
