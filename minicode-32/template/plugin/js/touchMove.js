'use strict';/**By 邢君可*/ var _createClass = function () { function b(c, d) { for (var g, f = 0; f < d.length; f++)g = d[f], g.enumerable = g.enumerable || !1, g.configurable = !0, 'value' in g && (g.writable = !0), Object.defineProperty(c, g.key, g) } return function (c, d, f) { return d && b(c.prototype, d), f && b(c, f), c } }(); var _Mathabs = Math.abs, _Mathmin = Math.min, _Mathmax = Math.max; Object.defineProperty(exports, '__esModule', { value: !0 }); function _toConsumableArray(b) { if (Array.isArray(b)) { for (var c = 0, d = Array(b.length); c < b.length; c++)d[c] = b[c]; return d } return Array.from(b) } function _classCallCheck(b, c) { if (!(b instanceof c)) throw new TypeError('Cannot call a class as a function') } var TouchMove = function () { function b(c) { _classCallCheck(this, b), this.touches = [], this.changedTouches = [], this.x = 0, this.y = 0, this.toucheCount = 0, this.allowScale = c } return _createClass(b, [{ key: 'scaleTouch', value: function scaleTouch() { return console.log('\u7F29\u653E\u529F\u80FD\u672A\u5B9E\u73B0'), { x: 0, y: 0 } } }, { key: 'switchTouch', value: function switchTouch(c) { var f, g, j, k, l, m, d = this.changedTouches, h = void 0, q = [], r = [], s = []; for (h = 0; h < c.length; h++)(f = c[h], g = d.find(function (t) { return t.identifier == f.identifier }), !!g) && (q.push(g.pageX - f.pageX), r.push(g.pageY - f.pageY), s.push(f)); return (this.changedTouches = s, !!s.length) && (this.allowScale && 2 == s.length ? this.scaleTouch(s, d) : (j = _Mathmax.apply(Math, q), k = _Mathmax.apply(Math, r), l = _Mathmin.apply(Math, q), m = _Mathmin.apply(Math, r), 0 > j && (j = l, l = 0), 0 > k && (k = m, m = 0), 0 > l && (j += l), 0 > m && (k += m), { x: j, y: k })) } }, { key: 'onMove', value: function onMove(c) { var d; switch (c.type) { case 'touchmove': var f = this.switchTouch(c.touches); return f ? (this.x += f.x, this.y += f.y, this.is_first && (this.is_first = !1, this.first = .6 * _Mathabs(this.x) > _Mathabs(this.y) ? 'x' : 'y'), { type: 'move', first: this.first, x: -this.x, y: -this.y }) : {}; break; case 'touchstart': return 0 == this.changedTouches.length && (this.x = 0, this.y = 0, this.is_first = !0), this.toucheCount++ , (d = this.changedTouches).push.apply(d, _toConsumableArray(c.changedTouches)), { type: 'start', x: 0, y: 0 }; default: this.toucheCount--; var g = this.changedTouches.findIndex(function (h) { return h.identifier == c.changedTouches[0].identifier }); if (this.changedTouches.splice(0, g + 1), 0 == this.changedTouches.length) return { type: 'end', first: this.first, x: -this.x, y: -this.y }; }return {} } }, { key: 'retrnEnd', value: function retrnEnd() { return this.changedTouches = [], { type: 'end', first: this.first, x: -this.x, y: -this.y } } }]), b }(); exports.default = TouchMove;