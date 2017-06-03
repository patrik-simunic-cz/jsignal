(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.jsignal = factory());
}(this, (function () { 'use strict';

var jSignal = function () {
    function jSignal() {
        babelHelpers.classCallCheck(this, jSignal);
    }

    babelHelpers.createClass(jSignal, [{
        key: 'listen',
        value: function listen() {}
    }, {
        key: 'unlisten',
        value: function unlisten() {}
    }, {
        key: 'dispatch',
        value: function dispatch() {}
    }, {
        key: 'dispose',
        value: function dispose() {}
    }]);
    return jSignal;
}();

return jSignal;

})));
//# sourceMappingURL=jsignal.js.map
