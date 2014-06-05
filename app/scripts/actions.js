(function() {
  var actions, downArrow, leftArrow, quarterNote, rightArrow, upArrow;

  actions = angular.module('actions', []);

  actions.factory('Actions', function() {
    return function(score, cursor) {
      var i, key, keyMap, letter, value, _i, _len, _ref, _ref1, _ref2;
      this.addNote = function() {
        return score.addNote(cursor, 0);
      };
      this.addRest = function() {
        return score.addNote(cursor);
      };
      this.addNote2Above = function() {
        return score.addNote(cursor, 1);
      };
      this.addNote3Above = function() {
        return score.addNote(cursor, 2);
      };
      this.addNote4Above = function() {
        return score.addNote(cursor, 3);
      };
      this.addNote5Above = function() {
        return score.addNote(cursor, 4);
      };
      this.addNote2Below = function() {
        return score.addNote(cursor, -1);
      };
      this.addNote3Below = function() {
        return score.addNote(cursor, -2);
      };
      this.addNote4Below = function() {
        return score.addNote(cursor, -3);
      };
      this.addNote5Below = function() {
        return score.addNote(cursor, -4);
      };
      this.up3 = function() {
        var i, _i, _results;
        _results = [];
        for (i = _i = 1; _i < 3; i = ++_i) {
          _results.push(cursor.up());
        }
        return _results;
      };
      this.up5 = function() {
        var i, _i, _results;
        _results = [];
        for (i = _i = 1; _i < 5; i = ++_i) {
          _results.push(cursor.up());
        }
        return _results;
      };
      this.up8 = function() {
        var i, _i, _results;
        _results = [];
        for (i = _i = 1; _i < 8; i = ++_i) {
          _results.push(cursor.up());
        }
        return _results;
      };
      this.down3 = function() {
        var i, _i, _results;
        _results = [];
        for (i = _i = 1; _i < 3; i = ++_i) {
          _results.push(cursor.down());
        }
        return _results;
      };
      this.down5 = function() {
        var i, _i, _results;
        _results = [];
        for (i = _i = 1; _i < 5; i = ++_i) {
          _results.push(cursor.down());
        }
        return _results;
      };
      this.down8 = function() {
        var i, _i, _results;
        _results = [];
        for (i = _i = 1; _i < 8; i = ++_i) {
          _results.push(cursor.down());
        }
        return _results;
      };
      this.removeNote = function() {
        return score.removeNote(cursor);
      };
      this.addTrebleClef = function() {
        if (!(cursor.staff < 0)) {
          return score.toggleEvent(cursor, {
            clef: 'treble'
          }, cursor.measure === 0);
        }
      };
      this.addKeySignature = function() {
        if (cursor.staff < 0) {
          return score.toggleEvent(cursor, {
            key: prompt('Key signature')
          }, cursor.measure === 0);
        }
      };
      this.addTimeSignature = function() {
        if (cursor.staff < 0) {
          return score.toggleEvent(cursor, {
            time: {
              n: prompt('Time signature numerator'),
              d: prompt('Time signature denominator')
            }
          }, cursor.measure === 0);
        }
      };
      this.addFinalBarLine = function() {
        if (cursor.staff < 0) {
          return score.toggleEvent(cursor, {
            barLine: '|.'
          });
        }
      };
      this.up = function() {
        return cursor.up();
      };
      this.down = function() {
        return cursor.down();
      };
      this.left = function() {
        return cursor.left();
      };
      this.right = function() {
        return cursor.right();
      };
      this.layerUp = function() {
        return cursor.layerUp();
      };
      this.layerDown = function() {
        return cursor.layerDown();
      };
      this.setWholeNote = function() {
        return cursor.setNoteType(1);
      };
      this.setHalfNote = function() {
        return cursor.setNoteType(2);
      };
      this.setQuarterNote = function() {
        return cursor.setNoteType(4);
      };
      this.setEighthNote = function() {
        return cursor.setNoteType(8);
      };
      this.setSixteenthNote = function() {
        return cursor.setNoteType(16);
      };
      this.buttonDisplays = {
        addNote: 'note',
        addRest: 'rest',
        addNote2Above: '^2nd',
        addNote3Above: '^3rd',
        addNote4Above: '^4th',
        addNote5Above: '^5th',
        addNote2Below: 'v2nd',
        addNote3Below: 'v3rd',
        addNote4Below: 'v4th',
        addNote5Below: 'v5th',
        up3: upArrow + '3',
        up5: upArrow + '5',
        up8: upArrow + '8',
        down3: downArrow + '3',
        down5: downArrow + '5',
        down8: downArrow + '8',
        removeNote: 'del',
        addTrebleClef: 'clef',
        addKeySignature: 'key',
        addTimeSignature: 'time',
        addFinalBarLine: 'final',
        up: upArrow,
        down: downArrow,
        left: leftArrow,
        right: rightArrow,
        layerUp: upArrow + upArrow,
        layerDown: downArrow + downArrow,
        setWholeNote: '1/1',
        setHalfNote: '1/2',
        setQuarterNote: '1/4',
        setEighthNote: '1/8',
        setSixteenthNote: '1/16'
      };
      this.bindings = {
        a: 'down8',
        o: 'down5',
        e: 'down3',
        u: 'down',
        d: 'addRest',
        i: 'addNote',
        h: 'up',
        t: 'up3',
        n: 'up5',
        s: 'up8',
        '-': 'removeNote',
        "delete": 'left',
        ';': 'addFinalBarLine',
        ',': 'addTrebleClef',
        '.': 'addKeySignature',
        p: 'addTimeSignature',
        up: 'layerUp',
        down: 'layerDown',
        left: 'left',
        right: 'right',
        space: 'right',
        j: 'layerDown',
        k: 'layerUp',
        g: 'setWholeNote',
        c: 'setHalfNote',
        r: 'setQuarterNote',
        l: 'setEighthNote',
        '/': 'setSixteenthNote'
      };
      keyMap = {
        "delete": 8,
        up: 38,
        down: 40,
        left: 37,
        right: 39,
        ';': 186,
        ',': 188,
        '.': 190,
        ';': 186,
        "'": 222,
        '/': 191,
        '-': 189,
        space: 32
      };
      _ref = 'abcdefghijklmnopqrstuvwxyz';
      for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
        letter = _ref[i];
        keyMap[letter] = 65 + i;
      }
      this.keyboardLayouts = {
        dvorak: [";,.pyfgcrl/".split(''), "aoeuidhtns-".split(''), "'qjkxbmwvz".split('')],
        qwerty: ["qwertyuiop[".split(''), "asdfghjkl;'".split(''), "zxcvbnm,./".split('')]
      };
      this.qwertyToDvorak = function(key) {
        var char, charIndex, dvorakKey, row, rowNum, _j, _k, _len1, _len2, _ref1;
        _ref1 = this.keyboardLayouts.qwerty;
        for (rowNum = _j = 0, _len1 = _ref1.length; _j < _len1; rowNum = ++_j) {
          row = _ref1[rowNum];
          for (charIndex = _k = 0, _len2 = row.length; _k < _len2; charIndex = ++_k) {
            char = row[charIndex];
            if (char === key) {
              dvorakKey = this.keyboardLayouts.dvorak[rowNum][charIndex];
            }
          }
        }
        return dvorakKey || key;
      };
      this.dvorakToQwerty = function(key) {
        var char, charIndex, qwertyKey, row, rowNum, _j, _k, _len1, _len2, _ref1;
        _ref1 = this.keyboardLayouts.dvorak;
        for (rowNum = _j = 0, _len1 = _ref1.length; _j < _len1; rowNum = ++_j) {
          row = _ref1[rowNum];
          for (charIndex = _k = 0, _len2 = row.length; _k < _len2; charIndex = ++_k) {
            char = row[charIndex];
            if (char === key) {
              qwertyKey = this.keyboardLayouts.qwerty[rowNum][charIndex];
            }
          }
        }
        return qwertyKey || key;
      };
      this.keybindings = {
        qwerty: {},
        dvorak: {}
      };
      _ref1 = this.bindings;
      for (key in _ref1) {
        value = _ref1[key];
        this.keybindings.dvorak[keyMap[key]] = this[value];
      }
      _ref2 = this.bindings;
      for (key in _ref2) {
        value = _ref2[key];
        this.keybindings.qwerty[keyMap[this.dvorakToQwerty(key)]] = this[value];
      }
      return this;
    };
  });

  quarterNote = '\u2669';

  upArrow = '\u2191';

  downArrow = '\u2193';

  leftArrow = '\u2190';

  rightArrow = '\u2192';

}).call(this);
