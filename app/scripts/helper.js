



(function() {

  window.helper = {};

  helper.toggleActive = function(element){
    element.toggleClass('active');
  };

  helper.getDuration = function(str) {
    var check, duration, e, note, notes, _i, _len;
    try {
      notes = str.split(',');
    } catch (_error) {
      e = _error;
      return 0;
    }
    duration = 0;
    if (notes.length === 1) {
      return 0;
    }
    for (_i = 0, _len = notes.length; _i < _len; _i++) {
      note = notes[_i];
      check = helper.checkNoteString(note);
      if (check[0]) {
        duration += check[1];
      }
    }
    return duration;
  };

  helper.noteString = function(num) {
    return "[Note " + num + " ready!] ";
  };

  helper.checkNoteString = function(str) {
    var d, duration, e, n, numbers, pitch, splitted;
    try {
      splitted = str.split(' ');
      pitch = splitted[0];
      duration = splitted[1];
      numbers = duration.split('/');
      n = numbers.split('/')[0];
      d = numbers.split('/')[1];
      if (parseInt(pitch) && parseInt(n) && parseInt(d)) {
        return [true, parseInt(n) / parseInt(d)];
      } else {
        return [false];
      }
    } catch (_error) {
      e = _error;
      return [false];
    }
  };

  helper.parseIncomplete = function(str) {
    var e, num, phrase, splitted, _i, _ref;
    try {
      splitted = str.split(',');
    } catch (_error) {
      e = _error;
      return 'rendering note ..';
    }
    phrase = '';
    if (splitted.length === 1) {
      return 'rendering note ..';
    }
    for (num = _i = 0, _ref = splitted.length; 0 <= _ref ? _i < _ref : _i > _ref; num = 0 <= _ref ? ++_i : --_i) {
      if (helper.checkNoteString(splitted[num])[0]) {
        phrase += helper.noteString(num);
      } else {
        phrase += 'rendering note ..';
      }
    }
    return phrase;
  };

  helper.parseNotes = function(noteString) {
    var d, n, note, notes, numbers, pitch, splitted, splittedInside, _i, _len;
    splitted = noteString.split(',');
    notes = [];
    for (_i = 0, _len = splitted.length; _i < _len; _i++) {
      note = splitted[_i];
      splittedInside = note.split(' ');
      pitch = splittedInside[0];
      numbers = splittedInside[1].split('/');
      n = numbers[0];
      d = numbers[1];
      notes.push(new helper.note(pitch, n, d));
    }
    return notes;
  };

  helper.addDuration = function(duration) {
    return parseInt(duration.n) + parseInt(duration.d);
  };

  helper.note = function(pitch, num, den) {
    this.pitch = pitch;
    this.duration = {
      n: num,
      d: den
    };
    return this;
  };

  helper.staffMeasure = function(events, notes) {
    this.events = events;
    return this.notes = notes;
  };

  helper.metaMeasure = function(events) {
    return this.events = events;
  };

  helper.animateKey = function(key) {
    var element;
    key = helper["class"](helper.keycode(key));
    element = $('.' + key);
    element.toggleClass('dark');
    setTimeout(function() {
      return element.toggleClass('dark');
    }, 100);
    return key;
  };

  helper.events = function(key) {
    return helper.animateKey(key);
  };

  helper.keycode = function(code) {
    if (code === 59) {
      return ';';
    } else if (code === 44) {
      return ',';
    } else if (code === 46) {
      return '.';
    } else if (code === 47) {
      return '/';
    } else if (code === 13) {
      return 'enter';
    }
    return 'abcdefghijklmnopqrstuvwxyz'[code - 65];
  };

  helper["class"] = function(char) {
    if (char === ';') {
      return 'semc';
    } else if (char === '.') {
      return 'dot';
    } else if (char === '/') {
      return 'slash';
    } else if (char === ',') {
      return 'comma';
    }
    return char;
  };



helper.ly = function(model) {

  var noteName = function(noteValue, key) {
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

  var getKeySignature = function(measureNum){

    while (!(measureNum === 0 || (model.meta.measures[measureNum].events.key != null))) {
      measureNum--;
    }
    return model.meta.measures[measureNum].events.key || 0;
    
  };

  var keyName, lyGenerator, noteName,
  __modulo = function(a, b) { return (a % b + +b) % b; };

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
          result += "" + (noteName(note.pitch, getKeySignature(i))) + note.duration.d + " ";
        }
      }
      result += '\n';
    }
    result += '}\n';
    result += '\\score { \\new Staff = "music" \\music }\n';
    return result;
  };



}).call(this);
