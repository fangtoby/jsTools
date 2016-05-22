webpackJsonp([2],{

/***/ 0:
/*!**********************!*\
  !*** ./src/songs.js ***!
  \**********************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _Songs = __webpack_require__(/*! ./js/es6/Songs */ 172);
	
	var _Songs2 = _interopRequireDefault(_Songs);
	
	var _People = __webpack_require__(/*! ./js/es6/People */ 88);
	
	var _People2 = _interopRequireDefault(_People);
	
	var _react = __webpack_require__(/*! react */ 87);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(/*! react-dom */ 57);
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var song = new _Songs2.default();
	var people = new _People2.default('fyl', 34);
	
	console.log(people.say());
	console.log(song.show());

/***/ },

/***/ 172:
/*!*****************************!*\
  !*** ./src/js/es6/Songs.js ***!
  \*****************************/
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
				value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Songs = function () {
				function Songs() {
							_classCallCheck(this, Songs);
				}
	
				_createClass(Songs, [{
							key: "show",
							value: function show() {
										return "In the Songs Class Use Show Function";
							}
				}]);
	
				return Songs;
	}();
	
	exports.default = Songs;

/***/ }

});
//# sourceMappingURL=songs.js.map