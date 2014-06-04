(function() {
  var musicSVG, svgNamespace;

  musicSVG = angular.module('musicSVG', ['paths']);

  musicSVG.directive('ngPath', [
    'paths', function(paths) {
      return {
        restrict: 'A',
        scope: {
          name: '@',
          x: '@',
          y: '@'
        },
        link: function(scope, $element, $attrs) {
          var _ref, _ref1, _ref2, _ref3, _ref4;
          $element.attr({
            d: ((_ref = paths[scope.name]) != null ? _ref.d : void 0) || 'M 0 0',
            transform: "translate(" + (scope.x || 0) + ", " + (scope.y || 0) + ") scale(" + (((_ref1 = paths[scope.name]) != null ? (_ref2 = _ref1.scale) != null ? _ref2.x : void 0 : void 0) || 0) + ", " + (((_ref3 = paths[scope.name]) != null ? (_ref4 = _ref3.scale) != null ? _ref4.y : void 0 : void 0) || 0) + ")",
            stroke: 'currentColor'
          });
          return scope.$watch('name', function(newName) {
            var _ref5, _ref6, _ref7, _ref8, _ref9;
            return $element.attr({
              d: ((_ref5 = paths[scope.name]) != null ? _ref5.d : void 0) || 'M 0 0',
              transform: "translate(" + (scope.x || 0) + ", " + (scope.y || 0) + ") scale(" + (((_ref6 = paths[scope.name]) != null ? (_ref7 = _ref6.scale) != null ? _ref7.x : void 0 : void 0) || 0) + ", " + (((_ref8 = paths[scope.name]) != null ? (_ref9 = _ref8.scale) != null ? _ref9.y : void 0 : void 0) || 0) + ")"
            });
          });
        }
      };
    }
  ]);

  musicSVG.directive('ngStaff', function() {
    return {
      restrict: 'A',
      scope: {
        width: '@',
        x: '@',
        y: '@',
        single: '='
      },
      link: function(scope, $element, $attrs) {
        var height, heights, line, _i, _len, _results;
        $element.attr({
          transform: "translate(" + (scope.x || 0) + ", " + (scope.y || 0) + ")"
        });
        heights = scope.single ? [0] : [-2, -1, 0, 1, 2];
        _results = [];
        for (_i = 0, _len = heights.length; _i < _len; _i++) {
          height = heights[_i];
          line = document.createElementNS(svgNamespace, 'line');
          angular.element(line).attr({
            x1: 0,
            y1: height,
            x2: scope.width,
            y2: height,
            'stroke-width': 0.1,
            stroke: 'currentColor'
          });
          _results.push($element.append(line));
        }
        return _results;
      }
    };
  });

  musicSVG.directive('ngLine', function() {
    return {
      restrict: 'A',
      scope: {
        width: '@',
        x: '@',
        y: '@'
      },
      link: function(scope, $element, $attrs) {
        return $element.attr({
          transform: "translate(" + (scope.x || 0) + ", " + (scope.y || 0) + ")",
          x1: 0,
          y1: 0,
          x2: scope.width,
          y2: 0,
          'stroke-width': 0.1,
          stroke: 'currentColor'
        });
      }
    };
  });

  musicSVG.directive('ngKeySignature', function() {
    return {
      restrict: 'A',
      scope: {
        value: '@',
        x: '@',
        y: '@'
      },
      controller: [
        '$scope', function($scope) {
          return $scope.paths = _.memoize(function(value) {
            var flatHeights, heights, i, name, sharpHeights, _i, _ref, _results;
            name = value >= 0 ? 'sharp' : 'flat';
            sharpHeights = [-1.5, 0, -2, -0.5, 1, -1, 0.5];
            flatHeights = [0.5, -1, 1, -0.5, 1.5, 0, 2];
            heights = name === 'sharp' ? sharpHeights : flatHeights;
            _results = [];
            for (i = _i = 0, _ref = Math.abs(value); 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
              if (i < 7) {
                _results.push({
                  name: name,
                  x: i,
                  y: heights[i]
                });
              }
            }
            return _results;
          });
        }
      ],
      template: '<path ng-path ng-repeat="path in paths(value)" name="{{path.name}}" x="{{path.x}}" y="{{path.y}}"/>',
      link: function(scope, $element, $attrs) {
        return $element.attr({
          transform: "translate(" + (scope.x || 0) + ", " + (scope.y || 0) + ")"
        });
      }
    };
  });

  musicSVG.directive('ngTimeSignature', function() {
    return {
      restrict: 'A',
      scope: {
        top: '@',
        bottom: '@',
        x: '@',
        y: '@'
      },
      template: '<path ng-path name="{{top}}"/><path ng-path name="{{bottom}}" y="2"/>',
      link: function(scope, $element, $attrs) {
        return $element.attr({
          transform: "translate(" + (scope.x || 0) + ", " + (scope.y || 0) + ")"
        });
      }
    };
  });

  musicSVG.directive('ngStem', function() {
    return {
      restrict: 'A',
      scope: {
        direction: '@'
      },
      link: function(scope, $element, $attrs) {
        return $element.attr({
          x: scope.direction === 'up' ? 1.2512 : 0,
          y: scope.direction === 'up' ? -3.5 : 0.1878,
          width: 0.13,
          height: 3.3122,
          ry: 0.04,
          fill: 'currentColor'
        });
      }
    };
  });

  musicSVG.directive('ngNote', function() {
    return {
      restrict: 'A',
      scope: {
        type: '@',
        stem: '@',
        x: '@',
        y: '@'
      },
      controller: [
        '$scope', function($scope) {
          return $scope.noteHeadName = function(type) {
            switch (type) {
              case '1':
                return 'wholeNoteHead';
              case '2':
                return 'halfNoteHead';
              default:
                return 'solidNoteHead';
            }
          };
        }
      ],
      template: '<path ng-path name="{{noteHeadName(type)}}"/> <rect ng-stem direction="{{stem}}" ng-hide="type == 1"/>',
      link: function(scope, $element, $attrs) {
        return $element.attr({
          transform: "translate(" + (scope.x || 0) + ", " + (scope.y || 0) + ")"
        });
      }
    };
  });

  musicSVG.directive('ngPositionedNote', function() {
    return {
      restrict: 'A',
      scope: {
        type: '@',
        position: '@',
        x: '@',
        y: '@'
      },
      template: '<g ng-note type="{{type}}" y="{{position}}" stem="{{position > 0 ? \'up\' : \'down\'}}"/>',
      link: function(scope, $element, $attrs) {
        return $element.attr({
          transform: "translate(" + (scope.x || 0) + ", " + (scope.y || 0) + ")"
        });
      }
    };
  });

  musicSVG.directive('ngBarline', function() {
    return {
      restrict: 'A',
      scope: {
        type: '@',
        position: '@',
        size: '@'
      },
      link: function(scope, $element, $attrs) {
        return $element.attr({
          transform: "translate(" + (scope.position || 0) + ", 0)",
          x: -0.19,
          y: -(scope.size || 2),
          width: 0.19,
          height: 2 * (scope.size || 2),
          fill: 'currentColor'
        });
      }
    };
  });

  musicSVG.directive('ngClef', function() {
    return {
      restrict: 'A',
      scope: {
        name: '@',
        x: '@',
        y: '@'
      },
      template: '<path ng-path name="{{name}}Clef" y="1"/>',
      link: function(scope, $element, $attrs) {
        return $element.attr({
          transform: "translate(" + (scope.x || 0) + ", " + (scope.y || 0) + ")"
        });
      }
    };
  });

  musicSVG.directive('ngMeasure', function() {
    return {
      restrict: 'A',
      scope: {
        model: '=',
        measureNum: '=',
        type: '@',
        measure: '=',
        cursor: '=',
        staff: '='
      },
      templateUrl: '../../views/measure.html'
    };
  });

  musicSVG.directive('ngCursor', function() {
    return {
      scope: {
        position: '@',
        cursorHeight: '@'
      },
      link: function(scope, $element, $attrs) {
        $element.attr({
          transform: "translate(" + (scope.position || 0) + ", " + (scope.cursorHeight / 2 || 0) + ")",
          x: 0,
          y: -0.3,
          width: 3,
          height: 0.6,
          fill: 'blue'
        });
        return scope.$watch('cursorHeight', function(newHeight) {
          return $element.attr({
            transform: "translate(" + (scope.position || 0) + ", " + (newHeight / 2 || 0) + ")"
          });
        });
      }
    };
  });

  svgNamespace = 'http://www.w3.org/2000/svg';

}).call(this);
