'use strict';

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var jSignal = function () {
    function jSignal() {
        classCallCheck(this, jSignal);
        this._listeners = [];
    }

    createClass(jSignal, [{
        key: 'listen',
        value: function listen(listener) {
            if (this._listeners === undefined || this._listeners === null) return console.error('Cannot listen on destroyed jSignal;', 'listener:', listener);
            if (typeof listener !== 'function') throw new Error('jSignal.listen expects a function');
            this._listeners.push(listener);
        }
    }, {
        key: 'unlisten',
        value: function unlisten(listener) {
            if (this._listeners === undefined || this._listeners === null) return console.error('Cannot unlisten on destroyed jSignal;', 'listener:', listener);
            if (typeof listener !== 'function') throw new Error('jSignal.unlisten expects a function');
            var listenerIndex = this._listeners.indexOf(listener);
            delete this._listeners[listenerIndex];
        }
    }, {
        key: 'dispatch',
        value: function dispatch() {
            var _console;

            for (var _len = arguments.length, payload = Array(_len), _key = 0; _key < _len; _key++) {
                payload[_key] = arguments[_key];
            }

            if (this._listeners === undefined || this._listeners === null) return (_console = console).error.apply(_console, ['Cannot dispatch destroyed jSignal;', 'with payload:'].concat(payload));
            this._listeners.map(function (listener) {
                return listener.apply(undefined, payload);
            });
        }
    }, {
        key: 'dispose',
        value: function dispose() {
            if (this._listeners === undefined || this._listeners === null) return console.error('Cannot dispose destroyed jSignal');
            this._listeners = [];
        }
    }, {
        key: 'destroy',
        value: function destroy() {
            this._listeners = null;
        }
    }]);
    return jSignal;
}();

module.exports = jSignal;
