/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__dirname) {'use strict';

	var _express = __webpack_require__(1);

	var _express2 = _interopRequireDefault(_express);

	var _path = __webpack_require__(2);

	var _path2 = _interopRequireDefault(_path);

	var _compression = __webpack_require__(3);

	var _compression2 = _interopRequireDefault(_compression);

	var _react = __webpack_require__(4);

	var _react2 = _interopRequireDefault(_react);

	var _reactRouter = __webpack_require__(5);

	var _routes = __webpack_require__(6);

	var _routes2 = _interopRequireDefault(_routes);

	var _server = __webpack_require__(16);

	var _mongoose = __webpack_require__(17);

	var _mongoose2 = _interopRequireDefault(_mongoose);

	var _helpers = __webpack_require__(18);

	var _helpers2 = _interopRequireDefault(_helpers);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var app = (0, _express2.default)();

	app.use((0, _compression2.default)());

	app.use(_express2.default.static(_path2.default.join(__dirname, 'public'), { index: false }));

	app.get('*', function (req, res) {
	  (0, _reactRouter.match)({ routes: _routes2.default, location: req.url }, function (err, redirect, props) {
	    if (err) {
	      res.status(500).send(err.message);
	    } else if (redirect) {
	      res.redirect(redirect.pathname + redirect.search);
	    } else if (props) {
	      var appHtml = (0, _server.renderToString)(_react2.default.createElement(_reactRouter.RouterContext, props));
	      res.send(renderPage(appHtml));
	    } else {
	      res.status(404).send('Not found');
	    }
	  });
	});

	_helpers2.default.getMatch(2193394945);

	function renderPage(appHtml) {
	  return '\n    <!DOCTYPE html>\n    <html lang="en">\n    <head>\n      <meta charset="UTF-8">\n      <title>lol</title>\n      <link rel="stylesheet" href="/index.css">\n    </head>\n    <body>\n      <div id="app">' + appHtml + '</div>\n      <script src="/bundle.js"></script>\n    </body>\n    </html>\n  ';
	}

	var PORT = process.env.PORT || 8080;
	var localuri = 'mongodb://localhost/banthesefools';
	var uristring = process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || localuri;

	_mongoose2.default.connect(uristring, function (err, res) {
	  if (err) {
	    console.log('Error connecting to ' + uristring + ' ' + err);
	  } else {
	    console.log('Successful connecting to ' + uristring);
	  }
	});

	app.listen(PORT, function () {
	  console.log('Production server running at localhost:' + PORT);
	});
	/* WEBPACK VAR INJECTION */}.call(exports, ""))

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = require("express");

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = require("path");

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = require("compression");

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = require("react");

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = require("react-router");

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _react = __webpack_require__(4);

	var _react2 = _interopRequireDefault(_react);

	var _reactRouter = __webpack_require__(5);

	var _App = __webpack_require__(7);

	var _App2 = _interopRequireDefault(_App);

	var _About = __webpack_require__(10);

	var _About2 = _interopRequireDefault(_About);

	var _Home = __webpack_require__(11);

	var _Home2 = _interopRequireDefault(_Home);

	var _Repo = __webpack_require__(14);

	var _Repo2 = _interopRequireDefault(_Repo);

	var _Repos = __webpack_require__(15);

	var _Repos2 = _interopRequireDefault(_Repos);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	module.exports = _react2.default.createElement(
	  _reactRouter.Route,
	  { path: '/', component: _App2.default },
	  _react2.default.createElement(_reactRouter.IndexRoute, { component: _Home2.default }),
	  _react2.default.createElement(
	    _reactRouter.Route,
	    { path: '/repos', component: _Repos2.default },
	    _react2.default.createElement(_reactRouter.Route, { path: '/repos/:userName/:repoName', component: _Repo2.default })
	  ),
	  _react2.default.createElement(_reactRouter.Route, { path: '/about', component: _About2.default })
	);

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(4);

	var _react2 = _interopRequireDefault(_react);

	var _NavLink = __webpack_require__(8);

	var _NavLink2 = _interopRequireDefault(_NavLink);

	var _NavBar = __webpack_require__(9);

	var _NavBar2 = _interopRequireDefault(_NavBar);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _react2.default.createClass({
	  displayName: 'App',
	  render: function render() {
	    return _react2.default.createElement(
	      'div',
	      null,
	      _react2.default.createElement(_NavBar2.default, null),
	      _react2.default.createElement(
	        'h1',
	        null,
	        'Champion Stats'
	      ),
	      this.props.children
	    );
	  }
	});

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(4);

	var _react2 = _interopRequireDefault(_react);

	var _reactRouter = __webpack_require__(5);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var NavLink = function (_React$Component) {
	  _inherits(NavLink, _React$Component);

	  function NavLink() {
	    _classCallCheck(this, NavLink);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(NavLink).apply(this, arguments));
	  }

	  _createClass(NavLink, [{
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement(_reactRouter.Link, _extends({}, this.props, { activeClassName: 'active' }));
	    }
	  }]);

	  return NavLink;
	}(_react2.default.Component);

	exports.default = NavLink;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(4);

	var _react2 = _interopRequireDefault(_react);

	var _NavLink = __webpack_require__(8);

	var _NavLink2 = _interopRequireDefault(_NavLink);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var navStyle = {
	  listStyle: 'none'
	};

	var listStyle = {
	  display: 'inline'
	};

	var NavBar = function (_React$Component) {
	  _inherits(NavBar, _React$Component);

	  function NavBar() {
	    _classCallCheck(this, NavBar);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(NavBar).apply(this, arguments));
	  }

	  _createClass(NavBar, [{
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement(
	        'div',
	        null,
	        _react2.default.createElement(
	          'ul',
	          { style: navStyle, role: 'nav' },
	          _react2.default.createElement(
	            'li',
	            { style: listStyle },
	            _react2.default.createElement(
	              _NavLink2.default,
	              { to: '/', onlyActiveOnIndex: true },
	              'Home'
	            )
	          ),
	          _react2.default.createElement(
	            'li',
	            { style: listStyle },
	            _react2.default.createElement(
	              _NavLink2.default,
	              { to: '/about' },
	              'About'
	            )
	          ),
	          _react2.default.createElement(
	            'li',
	            { style: listStyle },
	            _react2.default.createElement(
	              _NavLink2.default,
	              { to: '/repos' },
	              'Repos'
	            )
	          )
	        )
	      );
	    }
	  }]);

	  return NavBar;
	}(_react2.default.Component);

	exports.default = NavBar;
	;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(4);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var About = function (_React$Component) {
	  _inherits(About, _React$Component);

	  function About() {
	    _classCallCheck(this, About);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(About).apply(this, arguments));
	  }

	  _createClass(About, [{
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement(
	        'div',
	        null,
	        'About'
	      );
	    }
	  }]);

	  return About;
	}(_react2.default.Component);

	exports.default = About;

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(4);

	var _react2 = _interopRequireDefault(_react);

	var _TopChamps = __webpack_require__(12);

	var _TopChamps2 = _interopRequireDefault(_TopChamps);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Home = function (_React$Component) {
	  _inherits(Home, _React$Component);

	  function Home() {
	    _classCallCheck(this, Home);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(Home).apply(this, arguments));
	  }

	  _createClass(Home, [{
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement(
	        'div',
	        null,
	        'Home'
	      );
	    }
	  }]);

	  return Home;
	}(_react2.default.Component);

	exports.default = Home;

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(4);

	var _react2 = _interopRequireDefault(_react);

	var _Champion = __webpack_require__(13);

	var _Champion2 = _interopRequireDefault(_Champion);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var TopChamps = function (_React$Component) {
	  _inherits(TopChamps, _React$Component);

	  function TopChamps() {
	    _classCallCheck(this, TopChamps);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(TopChamps).apply(this, arguments));
	  }

	  _createClass(TopChamps, [{
	    key: 'getTopChamps',
	    value: function getTopChamps(list) {
	      return list.map(function (champ) {
	        return _react2.default.createElement(_Champion2.default, { champion: champ });
	      });
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement(
	        'table',
	        null,
	        _react2.default.createElement(_Champion2.default, null)
	      );
	    }
	  }]);

	  return TopChamps;
	}(_react2.default.Component);

	exports.default = TopChamps;

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(4);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Champion = function (_React$Component) {
	  _inherits(Champion, _React$Component);

	  function Champion(props) {
	    _classCallCheck(this, Champion);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(Champion).call(this, props));
	  }

	  _createClass(Champion, [{
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement(
	        'tr',
	        null,
	        _react2.default.createElement(
	          'td',
	          null,
	          this.props.champion.name
	        ),
	        _react2.default.createElement(
	          'td',
	          null,
	          this.props.champion.winrate
	        )
	      );
	    }
	  }]);

	  return Champion;
	}(_react2.default.Component);

	exports.default = Champion;

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(4);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Repo = function (_React$Component) {
	  _inherits(Repo, _React$Component);

	  function Repo() {
	    _classCallCheck(this, Repo);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(Repo).apply(this, arguments));
	  }

	  _createClass(Repo, [{
	    key: 'render',
	    value: function render() {
	      var _props$params = this.props.params;
	      var userName = _props$params.userName;
	      var repoName = _props$params.repoName;

	      return _react2.default.createElement(
	        'div',
	        null,
	        _react2.default.createElement(
	          'h2',
	          null,
	          userName,
	          ' / ',
	          repoName
	        )
	      );
	    }
	  }]);

	  return Repo;
	}(_react2.default.Component);

	exports.default = Repo;

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(4);

	var _react2 = _interopRequireDefault(_react);

	var _NavLink = __webpack_require__(8);

	var _NavLink2 = _interopRequireDefault(_NavLink);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Repos = function (_React$Component) {
	  _inherits(Repos, _React$Component);

	  function Repos(props) {
	    _classCallCheck(this, Repos);

	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Repos).call(this, props));

	    _this.handleSubmit = _this.handleSubmit.bind(_this);
	    return _this;
	  }

	  _createClass(Repos, [{
	    key: 'handleSubmit',
	    value: function handleSubmit(e) {
	      e.preventDefault();
	      var userName = e.target.elements[0].value;
	      var repo = e.target.elements[1].value;
	      var path = '/repos/' + userName + '/' + repo;
	      this.context.router.push(path);
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement(
	        'div',
	        null,
	        _react2.default.createElement(
	          'h2',
	          null,
	          'Repos'
	        ),
	        _react2.default.createElement(
	          'ul',
	          null,
	          _react2.default.createElement(
	            'li',
	            null,
	            _react2.default.createElement(
	              _NavLink2.default,
	              { to: '/repos/reactjs/react-router' },
	              'React Router'
	            )
	          ),
	          _react2.default.createElement(
	            'li',
	            null,
	            _react2.default.createElement(
	              _NavLink2.default,
	              { to: '/repos/facebook/react' },
	              'React'
	            )
	          ),
	          _react2.default.createElement(
	            'li',
	            null,
	            _react2.default.createElement(
	              'form',
	              { onSubmit: this.handleSubmit },
	              _react2.default.createElement('input', { type: 'text', placeholder: 'userName' }),
	              ' / ',
	              ' ',
	              _react2.default.createElement('input', { type: 'text', placeholder: 'repo' }),
	              ' ',
	              _react2.default.createElement(
	                'button',
	                { type: 'submit' },
	                'Go'
	              )
	            )
	          )
	        ),
	        this.props.children
	      );
	    }
	  }]);

	  return Repos;
	}(_react2.default.Component);

	Repos.contextTypes = {
	  router: _react2.default.PropTypes.object
	};

	exports.default = Repos;

/***/ },
/* 16 */
/***/ function(module, exports) {

	module.exports = require("react-dom/server");

/***/ },
/* 17 */
/***/ function(module, exports) {

	module.exports = require("mongoose");

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__dirname) {'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _axios = __webpack_require__(19);

	var _axios2 = _interopRequireDefault(_axios);

	var _fs = __webpack_require__(20);

	var _fs2 = _interopRequireDefault(_fs);

	var _path = __webpack_require__(2);

	var _path2 = _interopRequireDefault(_path);

	var _champions = __webpack_require__(21);

	var _champions2 = _interopRequireDefault(_champions);

	var _matches = __webpack_require__(22);

	var _matches2 = _interopRequireDefault(_matches);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var API_KEY = _fs2.default.readFileSync(_path2.default.join(__dirname, '../private/api_key.txt')).toString();

	var summonerByName = _axios2.default.create({
	  baseURL: 'https://na.api.pvp.net/api/lol/na/v1.4/summoner/by-name/',
	  params: {
	    api_key: API_KEY
	  }
	});

	var matchList = _axios2.default.create({
	  baseURL: 'https://na.api.pvp.net/api/lol/na/v2.2/matchlist/by-summoner/',
	  params: {
	    api_key: API_KEY,
	    seasons: 'SEASON2016'
	  }
	});

	var singleMatch = _axios2.default.create({
	  baseURL: 'https://na.api.pvp.net/api/lol/na/v2.2/match/',
	  params: {
	    api_key: API_KEY
	  }
	});

	function getSummonerId(name) {
	  summonerByName.get('/' + name.toString()).then(function (res) {
	    console.log(res.data);
	  }).catch(function (res) {
	    if (res instanceof Error) {
	      // Something in request triggered an error
	      console.log('Error', res.message);
	    } else {
	      // request made but not 2xx status code
	      console.log(res.data, res.status, res.headers, res.config);
	    }
	  });
	}

	function getMatchList(id) {
	  matchList.get('/' + id).then(function (res) {

	    var matchListTeam3x3 = res.data.matches.filter(function (match) {
	      return match.queue === 'RANKED_TEAM_3x3';
	    });

	    var matchListSolo5x5 = res.data.matches.filter(function (match) {
	      return match.queue === 'TEAM_BUILDER_DRAFT_RANKED_5x5';
	    });
	  }).catch(function (res) {
	    if (res instanceof Error) {
	      // Something in request triggered an error
	      console.log('Error', res.message);
	    } else {
	      // request made but not 2xx status code
	      console.log(res.data, res.status, res.headers, res.config);
	    }
	  });
	}

	function getMatch(id) {
	  singleMatch.get('/' + id).then(function (res) {
	    // check if the match already exists in the match database
	    // go through the champions in the match and check if each champion won or lost
	    // add that number to the champion database
	    // add that match to the match database ?
	    var participants = res.data.participants;
	    var participantIdentities = res.data.participantIdentities;
	  }).catch(function (res) {
	    if (res instanceof Error) {
	      // Something in request triggered an error
	      console.log('Error', res.message);
	    } else {
	      // request made but not 2xx status code
	      console.log(res.data, res.status, res.headers, res.config);
	    }
	  });
	}

	exports.default = {
	  getSummonerId: getSummonerId,
	  getMatchList: getMatchList,
	  getMatch: getMatch
	};
	/* WEBPACK VAR INJECTION */}.call(exports, "helpers"))

/***/ },
/* 19 */
/***/ function(module, exports) {

	module.exports = require("axios");

/***/ },
/* 20 */
/***/ function(module, exports) {

	module.exports = require("fs");

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _mongoose = __webpack_require__(17);

	var _mongoose2 = _interopRequireDefault(_mongoose);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Schema = _mongoose2.default.Schema;

	var championSchema = new Schema({
	  name: String,
	  championId: Number,
	  gamesWon: Number,
	  gamesTotal: Number
	});

	var Champion = _mongoose2.default.model('Champion', championSchema);

	exports.default = Champion;

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _mongoose = __webpack_require__(17);

	var _mongoose2 = _interopRequireDefault(_mongoose);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Schema = _mongoose2.default.Schema;

	var matchSchema = new Schema({
	  matchId: Number,
	  players: [],
	  champions: []
	});

	var Match = _mongoose2.default.model('Match', matchSchema);

	exports.default = Match;

/***/ }
/******/ ]);