(function() {
  var dataModule,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  dataModule = angular.module('data', []);

  dataModule.factory('data', function() {
    var data;
    data = {};
    data.Score = (function() {
      function Score() {
        this.meta = {
          key: 0,
          time: {
            n: 4,
            d: 4
          },
          measures: [new data.Measure()]
        };
        this.staves = [
          {
            clef: 'treble',
            measures: [new data.StaffMeasure()]
          }
        ];
      }

      Score.prototype.currentMeasure = function(cursor) {
        if (cursor.staff < 0) {
          return this.meta.measures[cursor.measure];
        } else {
          return this.staves[cursor.staff].measures[cursor.measure];
        }
      };

      Score.prototype.addNote = function(cursor, offset) {
        var iterator, timeSignature, totalDuration;
        if (!(cursor.staff < 0)) {
          timeSignature = this.getTimeSignature(cursor.measure);
          iterator = function(memo, note, i) {
            if ((note.duration != null) && i !== cursor.position) {
              return memo + note.duration.n / note.duration.d;
            } else {
              return memo;
            }
          };
          totalDuration = 1 / cursor.noteType + _(this.currentMeasure(cursor).notes).reduce(iterator, 0);
          if (!(totalDuration > timeSignature.n / timeSignature.d)) {
            this.currentMeasure(cursor).addNote(cursor.position, {
              pitch: offset != null ? (6 - cursor.height) + offset : null,
              duration: {
                n: 1,
                d: cursor.noteType
              }
            });
            if (offset != null) {
              cursor.height = cursor.height - offset;
            }
            if (totalDuration === timeSignature.n / timeSignature.d) {
              if (cursor.measure === this.meta.measures.length - 1) {
                this.addMeasure();
              }
              if (_(this.currentMeasure(cursor).notes).last().duration == null) {
                return this.currentMeasure(cursor).notes.pop();
              }
            } else if (_(this.currentMeasure(cursor).notes).last().duration != null) {
              return this.currentMeasure(cursor).addNote(null, {});
            }
          }
        }
      };

      Score.prototype.removeNote = function(cursor) {
        var _results;
        if (!(cursor.staff < 0 || (this.currentMeasure(cursor).notes[cursor.position].duration == null))) {
          this.currentMeasure(cursor).removeNote(cursor.position);
          if (this.currentMeasure(cursor).notes.length === 0 || (_(this.currentMeasure(cursor).notes).last().duration != null)) {
            this.currentMeasure(cursor).addNote(null, {});
          }
          cursor.position = Math.min(cursor.position, Math.max(this.currentMeasure(cursor).notes.length - 1, 0));
          _results = [];
          while (!((_(_(this.staves[0].measures).last().notes).last().duration == null) && ((this.staves[0].measures[this.staves[0].measures.length - 2] == null) || (this.staves[0].measures[this.staves[0].measures.length - 2].notes[0].duration != null)))) {
            _results.push(this.removeMeasure(cursor));
          }
          return _results;
        }
      };

      Score.prototype.addEvent = function(cursor, event, global) {
        if (cursor.staff < 0) {
          if (global) {
            return _(this.meta).extend(event);
          } else {
            return this.meta.measures[cursor.measure].addEvent(event);
          }
        } else {
          if (global) {
            return _(this.staves[cursor.staff]).extend(event);
          } else {
            return this.currentMeasure(cursor).addEvent(event);
          }
        }
      };

      Score.prototype.removeEvent = function(cursor, eventKey, global) {
        if (cursor.staff < 0) {
          if (global) {
            return delete this.meta[eventKey];
          } else {
            return this.meta.measures[cursor.measure].removeEvent(eventKey);
          }
        } else {
          if (global) {
            return delete this.staves[cursor.staff][eventKey];
          } else {
            return this.currentMeasure(cursor).removeEvent(eventKey);
          }
        }
      };

      Score.prototype.toggleEvent = function(cursor, event, global) {
        var eventKey, key, track;
        for (key in event) {
          eventKey = key;
        }
        if (global) {
          track = cursor.staff < 0 ? this.meta : this.staves[cursor.staff];
          if (track[eventKey] != null) {
            return this.removeEvent(cursor, eventKey, global);
          } else {
            return this.addEvent(cursor, event, global);
          }
        } else {
          if (this.currentMeasure(cursor).events[eventKey] != null) {
            return this.removeEvent(cursor, eventKey, global);
          } else {
            return this.addEvent(cursor, event, global);
          }
        }
      };

      Score.prototype.addMeasure = function() {
        this.meta.measures.push(new data.Measure());
        return _(this.staves).each(function(staff) {
          return staff.measures.push(new data.StaffMeasure());
        });
      };

      Score.prototype.removeMeasure = function(cursor) {
        if (this.meta.measures.length !== 1) {
          this.meta.measures.pop();
          _(this.staves).each(function(staff) {
            return staff.measures.pop();
          });
          return cursor.measure = Math.min(cursor.measure, this.meta.measures.length - 1);
        }
      };

      Score.prototype.getKeySignature = function(measureNum) {
        while (!(measureNum === 0 || (this.meta.measures[measureNum].events.key != null))) {
          measureNum--;
        }
        return this.meta.measures[measureNum].events.key || 0;
      };

      Score.prototype.getTimeSignature = function(measureNum) {
        while (!(measureNum === 0 || (this.meta.measures[measureNum].events.time != null))) {
          measureNum--;
        }
        return this.meta.measures[measureNum].events.time || {
          n: 4,
          d: 4
        };
      };

      return Score;

    })();
    data.Measure = (function() {
      function Measure(events) {
        this.events = events || {};
      }

      Measure.prototype.addEvent = function(event) {
        return _(this.events).extend(event);
      };

      Measure.prototype.removeEvent = function(eventKey) {
        return delete this.events[eventKey];
      };

      return Measure;

    })();
    data.StaffMeasure = (function(_super) {
      __extends(StaffMeasure, _super);

      function StaffMeasure() {
        StaffMeasure.__super__.constructor.apply(this, arguments);
        this.notes = [{}];
      }

      StaffMeasure.prototype.addNote = function(index, note) {
        if (index == null) {
          index = this.notes.length;
        }
        return this.notes[index] = note;
      };

      StaffMeasure.prototype.removeNote = function(index) {
        return this.notes.splice(index, 1);
      };

      return StaffMeasure;

    })(data.Measure);
    data.Cursor = (function() {
      function Cursor(score) {
        var _ref;
        this.score = score;
        _ref = [-1, 0, 0, 0, 4], this.staff = _ref[0], this.measure = _ref[1], this.position = _ref[2], this.height = _ref[3], this.noteType = _ref[4];
      }

      Cursor.prototype.up = function() {
        if (this.staff >= 0) {
          return this.height = Math.max(-5, this.height - 1);
        }
      };

      Cursor.prototype.down = function() {
        if (this.staff >= 0) {
          return this.height = Math.min(5, this.height + 1);
        }
      };

      Cursor.prototype.left = function() {
        if (this.position > 0) {
          return this.position--;
        } else if (this.measure > 0) {
          this.measure--;
          return this.position = this.staff < 0 ? 0 : Math.max(this.score.staves[this.staff].measures[this.measure].notes.length - 1, 0);
        }
      };

      Cursor.prototype.right = function() {
        var _ref;
        if (this.staff >= 0 && this.position < this.score.staves[this.staff].measures[this.measure].notes.length - 1) {
          return this.position++;
        } else if (this.measure < this.score.meta.measures.length - 1) {
          return _ref = [this.measure + 1, 0], this.measure = _ref[0], this.position = _ref[1], _ref;
        }
      };

      Cursor.prototype.layerUp = function() {
        var _ref;
        if (!(this.staff < 0)) {
          return _ref = [this.staff - 1, 0, 0], this.staff = _ref[0], this.position = _ref[1], this.height = _ref[2], _ref;
        }
      };

      Cursor.prototype.layerDown = function() {
        var _ref;
        if (!(this.staff >= this.score.staves.length - 1)) {
          return _ref = [this.staff + 1, 0, 0], this.staff = _ref[0], this.position = _ref[1], this.height = _ref[2], _ref;
        }
      };

      Cursor.prototype.setNoteType = function(noteType) {
        var cursorHeight, _ref, _ref1;
        this.noteType = noteType;
        if (((_ref = this.score.currentMeasure(this).notes) != null ? (_ref1 = _ref[this.position]) != null ? _ref1.duration : void 0 : void 0) != null) {
          if (this.score.currentMeasure(this).notes[this.position].pitch === null) {
            return this.score.addNote(this);
          } else {
            cursorHeight = this.height;
            this.height = -(this.score.currentMeasure(this).notes[this.position].pitch - 6);
            this.score.addNote(this, 0);
            return this.height = cursorHeight;
          }
        }
      };

      return Cursor;

    })();
    return data;
  });

}).call(this);
