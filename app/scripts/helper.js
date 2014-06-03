



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


  // $(function(){

  //   $('#home').on('click', function(){
  //     $(this).toggleClass('active');
  //   });
  //   $('#demo').on('click', function(){
  //     $(this).toggleClass('active');
  //   });
  //   $('#about').on('click', function(){
  //     $(this).toggleClass('active');
  //   });
  //   $('#download').on('click', function(){
  //     $(this).toggleClass('active');
  //   });

  // });

}).call(this);
