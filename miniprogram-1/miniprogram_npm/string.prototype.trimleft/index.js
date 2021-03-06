module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = { exports: {} }; __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); if(typeof m.exports === "object") { __MODS__[modId].m.exports.__proto__ = m.exports.__proto__; Object.keys(m.exports).forEach(function(k) { __MODS__[modId].m.exports[k] = m.exports[k]; Object.defineProperty(m.exports, k, { set: function(val) { __MODS__[modId].m.exports[k] = val; }, get: function() { return __MODS__[modId].m.exports[k]; } }); }); if(m.exports.__esModule) Object.defineProperty(__MODS__[modId].m.exports, "__esModule", { value: true }); } else { __MODS__[modId].m.exports = m.exports; } } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1571824936584, function(require, module, exports) {


var bind = require('function-bind');
var define = require('define-properties');

var implementation = require('./implementation');
var getPolyfill = require('./polyfill');
var shim = require('./shim');

var bound = bind.call(Function.call, getPolyfill());

define(bound, {
	getPolyfill: getPolyfill,
	implementation: implementation,
	shim: shim
});

module.exports = bound;

}, function(modId) {var map = {"./implementation":1571824936585,"./polyfill":1571824936586,"./shim":1571824936587}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1571824936585, function(require, module, exports) {


var bind = require('function-bind');
var replace = bind.call(Function.call, String.prototype.replace);

/* eslint-disable no-control-regex */
var leftWhitespace = /^[\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF]*/;
/* eslint-enable no-control-regex */

module.exports = function trimLeft() {
	return replace(this, leftWhitespace, '');
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1571824936586, function(require, module, exports) {


var implementation = require('./implementation');

module.exports = function getPolyfill() {
	if (!String.prototype.trimLeft) {
		return implementation;
	}
	var zeroWidthSpace = '\u200b';
	if (zeroWidthSpace.trimLeft() !== zeroWidthSpace) {
		return implementation;
	}
	return String.prototype.trimLeft;
};

}, function(modId) { var map = {"./implementation":1571824936585}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1571824936587, function(require, module, exports) {


var define = require('define-properties');
var getPolyfill = require('./polyfill');

module.exports = function shimTrimLeft() {
	var polyfill = getPolyfill();
	define(
		String.prototype,
		{ trimLeft: polyfill },
		{ trimLeft: function () { return String.prototype.trimLeft !== polyfill; } }
	);
	return polyfill;
};

}, function(modId) { var map = {"./polyfill":1571824936586}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1571824936584);
})()
//# sourceMappingURL=index.js.map