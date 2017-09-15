'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};











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
        value: function listen() {
            if (this._listeners === undefined || this._listeners === null) {
                throw new Error('Cannot listen on destroyed jSignal');
            }
            for (var i in arguments) {
                if (typeof arguments[i] !== 'function') {
                    console.error('jSignal.listen expects a function (or functions), but got ', _typeof(arguments[i]), '; on paramentr number ', i);
                } else {
                    this._listeners.push(arguments[i]);
                }
            }
        }
    }, {
        key: 'unlisten',
        value: function unlisten() {
            if (this._listeners === undefined || this._listeners === null) {
                throw new Error('Cannot unlisten on destroyed jSignal');
            }
            for (var i in arguments) {
                if (typeof arguments[i] !== 'function') {
                    console.error('jSignal.unlisten expects a function (or functions), but got ', _typeof(arguments[i]), '; on paramentr number ', i);
                } else {
                    var listenerIndex = this._listeners.indexOf(arguments[i]);
                    if (listenerIndex != -1) {}
                    delete this._listeners[listenerIndex];
                }
            }
        }
    }, {
        key: 'dispatch',
        value: function dispatch() {
            var _arguments = arguments;

            if (this._listeners === undefined || this._listeners === null) {
                throw new Error('Cannot dispatch an destroyed jSignal');
            }
            if (this._listeners === undefined || this._listeners === null) {
                return console.error('Cannot dispatch destroyed jSignal;', 'with payload:', arguments);
            }
            this._listeners.map(function (listener) {
                return listener(_arguments);
            });
        }
    }, {
        key: 'dispose',
        value: function dispose() {
            if (this._listeners === undefined || this._listeners === null) {
                throw new Error('Cannot dispose destroyed jSignal');
            }
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
