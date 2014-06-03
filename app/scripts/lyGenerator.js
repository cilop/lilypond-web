(function() {
  var keyName, lyGenerator, noteName,
    __modulo = function(a, b) { return (a % b + +b) % b; };

  lyGenerator = angular.module('lyGenerator', []);

  lyGenerator.factory('generateLy', function() {
    return function(model) {
      var clef, i, key, measure, note, result, time, _i, _j, _len, _len1, _ref, _ref1;
      result = '\\include "english.ly"\n';
      result += 'music = {\n';
      _ref = model.staves[0].measures;
      for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
        measure = _ref[i];
        if ((clef = measure.events.clef) != null) {
          result += "\\clef " + clef + "\n";
        }
        if ((key = model.meta.measures[i].events.key) != null) {
          result += "\\key " + (keyName(key)) + " \\major\n";
        }
        if ((time = model.meta.measures[i].events.time) != null) {
          result += "\\time " + time.n + "/" + time.d + "\n";
        }
        _ref1 = measure.notes;
        for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
          note = _ref1[_j];
          if (note.duration != null) {
            result += "" + (noteName(note.pitch, model.getKeySignature(i))) + note.duration.d + " ";
          }
        }
        result += '\n';
      }
      result += '}\n';
      result += '\\score { \\new Staff = "music" \\music }\n';
      return result;
    };
  });

  noteName = function(noteValue, key) {
    var char, i, keyFlats, keySharps, modified, names, octave, result, _i, _j, _k, _len, _len1, _ref, _ref1, _ref2;
    keySharps = 'fcgdaeb';
    keyFlats = 'beadgcf';
    modified = {};
    if (key > 0) {
      _ref = keySharps.slice(0, key);
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        char = _ref[_i];
        modified[char] = 's';
      }
    }
    if (key < 0) {
      _ref1 = keyFlats.slice(0, -key);
      for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
        char = _ref1[_j];
        modified[char] = 'f';
      }
    }
    console.log(key, keySharps.slice(0, +key + 1 || 9e9), modified);
    names = ['c', 'd', 'e', 'f', 'g', 'a', 'b'];
    result = names[__modulo(noteValue, 7)] + (modified[names[__modulo(noteValue, 7)]] || '');
    octave = (Math.floor(noteValue / 7)) + 1;
    for (i = _k = 0, _ref2 = Math.abs(octave); 0 <= _ref2 ? _k < _ref2 : _k > _ref2; i = 0 <= _ref2 ? ++_k : --_k) {
      result += octave < 0 ? ',' : '\'';
    }
    return result;
  };

  keyName = function(keyValue) {
    var keyNames;
    keyNames = {
      '-7': 'cf',
      '-6': 'gf',
      '-5': 'df',
      '-4': 'af',
      '-3': 'ef',
      '-2': 'bf',
      '-1': 'f',
      '0': 'c',
      '1': 'g',
      '2': 'd',
      '3': 'a',
      '4': 'e',
      '5': 'b',
      '6': 'fs',
      '7': 'cs'
    };
    return keyNames[keyValue];
  };

}).call(this);
