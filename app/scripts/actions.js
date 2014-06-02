(function() {
  angular.module('actions', []).factory('Actions', function() {
    return function(score, cursor) {
      var i, key, keyMap, letter, value, _i, _len, _ref, _ref1;
      this.addNote = function() {
        return score.addNote(cursor, 0);
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
      this.removeNote = function() {
        return score.removeNote(cursor);
      };
      this.addTrebleClef = function() {
        if (!(cursor.staff < 0)) {
          return score.toggleEvent(cursor, {
            clef: 'treble'
          });
        }
      };
      this.addKeySignature = function() {
        if (cursor.staff < 0) {
          return score.toggleEvent(cursor, {
            key: prompt('Key signature')
          });
        }
      };
      this.addTimeSignature = function() {
        if (cursor.staff < 0) {
          return score.toggleEvent(cursor, {
            time: {
              n: prompt('Time signature numerator'),
              d: prompt('Time signature denominator')
            }
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
      this.buttonDisplays = {
        addNote: 'same',
        addNote2Above: '^2nd',
        addNote3Above: '^3rd',
        addNote4Above: '^4th',
        addNote5Above: '^5th',
        addNote2Below: 'v2nd',
        addNote3Below: 'v3rd',
        addNote4Below: 'v4th',
        addNote5Below: 'v5th',
        removeNote: 'remove',
        addTrebleClef: 'clef',
        addKeySignature: 'key',
        addTimeSignature: 'time',
        up: 'up',
        down: 'down',
        left: 'left',
        right: 'right',
        layerUp: '^layer',
        layerDown: 'vlayer',
        setWholeNote: 'whole',
        setHalfNote: 'half',
        setQuarterNote: 'quarter'
      };
      this.bindings = {
        a: 'addNote5Below',
        o: 'addNote4Below',
        e: 'addNote3Below',
        u: 'addNote2Below',
        d: 'addNote',
        h: 'addNote2Above',
        t: 'addNote3Above',
        n: 'addNote4Above',
        s: 'addNote5Above',
        "delete": 'removeNote',
        ',': 'addTrebleClef',
        '.': 'addKeySignature',
        p: 'addTimeSignature',
        up: 'layerUp',
        down: 'layerDown',
        left: 'left',
        right: 'right',
        space: 'right',
        j: 'down',
        k: 'up',
        g: 'setWholeNote',
        c: 'setHalfNote',
        r: 'setQuarterNote'
      };
      keyMap = {
        "delete": 8,
        up: 38,
        down: 40,
        left: 37,
        right: 39,
        ',': 188,
        '.': 190,
        space: 32
      };
      _ref = 'abcdefghijklmnopqrstuvwxyz';
      for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
        letter = _ref[i];
        keyMap[letter] = 65 + i;
      }
      this.keybindings = {};
      _ref1 = this.bindings;
      for (key in _ref1) {
        value = _ref1[key];
        this.keybindings[keyMap[key]] = this[value];
      }
      return this;
    };
  });

}).call(this);
