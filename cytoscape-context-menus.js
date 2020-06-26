(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["cytoscapeContextMenus"] = factory();
	else
		root["cytoscapeContextMenus"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, "default", function() { return /* binding */ register; });

// CONCATENATED MODULE: ./src/utils.js
function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

// Utility functions that are not directly related with the extension
function getOffset(el) {
  var rect = el.getBoundingClientRect();
  return {
    top: rect.top,
    left: rect.left
  };
}
function matches(el, selector) {
  return (el.matches || el.matchesSelector || el.msMatchesSelector || el.mozMatchesSelector || el.webkitMatchesSelector || el.oMatchesSelector).call(el, selector);
}
function isElementHidden(elem) {
  return elem.offsetWidth <= 0 && elem.offsetHeight <= 0 || elem.style && elem.style.display || getComputedStyle(elem)['display'];
}
function isElementVisible(elem) {
  return !isElementHidden(elem);
} // Merge default options with the ones coming from parameter

function extend(defaults, options) {
  var obj = {};

  for (var i in defaults) {
    obj[i] = defaults[i];
  }

  for (var _i in options) {
    obj[_i] = options[_i];
  }

  return obj;
} // Get string representation of css classes

function getClassStr(classes) {
  var str = '';

  for (var i = 0; i < classes.length; i++) {
    var className = classes[i];
    str += className;

    if (i !== classes.length - 1) {
      str += ' ';
    }
  }

  return str;
}
function preventDefaultContextTap() {
  var contextMenuAreas = document.getElementsByClassName('cy-context-menus-cxt-menu');

  var _iterator = _createForOfIteratorHelper(contextMenuAreas),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var cxtMenuArea = _step.value;
      cxtMenuArea.addEventListener('contextmenu', function (e) {
        return e.preventDefault();
      });
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
}
/**
 * https://stackoverflow.com/a/38057647/12045421
 * 
 * @param { Element } element 
 * @param { string } attribute
 * @param { boolean } boolValue 
 */

function setBooleanAttribute(element, attribute, boolValue) {
  if (boolValue) {
    element.setAttribute(attribute, '');
  } else {
    element.removeAttribute(attribute);
  }
}
// CONCATENATED MODULE: ./src/constants.js
var DEFAULT_OPTS = {
  // Customize event to bring up the context menu
  // Possible options https://js.cytoscape.org/#events/user-input-device-events
  evtType: 'cxttap',
  // List of initial menu items
  menuItems: [
    /*
    {
      id: 'remove',
      content: 'remove',
      tooltipText: 'remove',
      selector: 'node, edge',
      onClickFunction: function () {
        console.log('remove element');
      },
      hasTrailingDivider: true
    },
    {
      id: 'hide',
      content: 'hide',
      tooltipText: 'remove',
      selector: 'node, edge',
      onClickFunction: function () {
        console.log('hide element');
      },
      disabled: true
    }*/
  ],
  // css classes that menu items will have
  menuItemClasses: [// add class names to this list
  ],
  // css classes that context menu will have
  contextMenuClasses: [// add class names to this list
  ]
};
var CXT_MENU_CSS_CLASS = 'cy-context-menus-cxt-menu';
var MENUITEM_CSS_CLASS = 'cy-context-menus-cxt-menuitem';
var DIVIDER_CSS_CLASS = 'cy-context-menus-divider';
// CONCATENATED MODULE: ./src/context-menu.js
function context_menu_createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = context_menu_unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function context_menu_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return context_menu_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return context_menu_arrayLikeToArray(o, minLen); }

function context_menu_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function set(target, property, value, receiver) { if (typeof Reflect !== "undefined" && Reflect.set) { set = Reflect.set; } else { set = function set(target, property, value, receiver) { var base = _superPropBase(target, property); var desc; if (base) { desc = Object.getOwnPropertyDescriptor(base, property); if (desc.set) { desc.set.call(receiver, value); return true; } else if (!desc.writable) { return false; } } desc = Object.getOwnPropertyDescriptor(receiver, property); if (desc) { if (!desc.writable) { return false; } desc.value = value; Object.defineProperty(receiver, property, desc); } else { _defineProperty(receiver, property, value); } return true; }; } return set(target, property, value, receiver); }

function _set(target, property, value, receiver, isStrict) { var s = set(target, property, value, receiver || target); if (!s && isStrict) { throw new Error('failed to set property'); } return value; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }


 // TODO: add submenu property

var context_menu_MenuItem = /*#__PURE__*/function (_HTMLButtonElement) {
  _inherits(MenuItem, _HTMLButtonElement);

  var _super = _createSuper(MenuItem);

  /**
   * @param {{ 
   *      id: string; 
   *      className: string; 
   *      tooltipText: string?;
   *      disabled: any?; 
   *      image: { 
   *          src: string; 
   *          width: number; 
   *          height: number; 
   *          y: string; 
   *          x: string; 
   *      }?; 
   *      content: string; 
   *      selector: any; 
   *      show: any; 
   * }} params
   */
  function MenuItem(params) {
    var _thisSuper, _thisSuper2, _thisSuper3, _thisSuper4, _thisSuper5, _thisSuper6, _this;

    _classCallCheck(this, MenuItem);

    _this = _super.call(this);

    _get((_thisSuper = _assertThisInitialized(_this), _getPrototypeOf(MenuItem.prototype)), "setAttribute", _thisSuper).call(_thisSuper, 'id', params.id);

    _get((_thisSuper2 = _assertThisInitialized(_this), _getPrototypeOf(MenuItem.prototype)), "setAttribute", _thisSuper2).call(_thisSuper2, 'class', params.className);

    if (_typeof(params.tooltipText) !== undefined) {
      _get((_thisSuper3 = _assertThisInitialized(_this), _getPrototypeOf(MenuItem.prototype)), "setAttribute", _thisSuper3).call(_thisSuper3, 'title', params.tooltipText);
    }

    if (params.disabled) {
      setBooleanAttribute(_assertThisInitialized(_this), 'disabled', true);
    }

    if (params.image) {
      var img = document.createElement('img');
      img.src = params.image.src;
      img.width = params.image.width;
      img.height = params.image.height;
      img.style.position = 'absolute';
      img.style.top = params.image.y + 'px';
      img.style.left = params.image.x + 'px';

      _get((_thisSuper4 = _assertThisInitialized(_this), _getPrototypeOf(MenuItem.prototype)), "appendChild", _thisSuper4).call(_thisSuper4, img);
    }

    _set((_thisSuper6 = _assertThisInitialized(_this), _getPrototypeOf(MenuItem.prototype)), "innerHTML", _get((_thisSuper5 = _assertThisInitialized(_this), _getPrototypeOf(MenuItem.prototype)), "innerHTML", _thisSuper5) + params.content, _thisSuper6, true);

    _this.data = {};
    _this.clickFns = [];
    _this.selector = params.selector;
    _this.show = params.show || true;
    console.log(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(MenuItem, [{
    key: "bindOnClickFunction",
    value: function bindOnClickFunction(onClickFn) {
      this.clickFns.push(onClickFn);

      _get(_getPrototypeOf(MenuItem.prototype), "addEventListener", this).call(this, 'click', onClickFn);
    }
  }, {
    key: "unbindOnClickFunctions",
    value: function unbindOnClickFunctions() {
      var _iterator = context_menu_createForOfIteratorHelper(this.clickFns),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var onClickFn = _step.value;

          _get(_getPrototypeOf(MenuItem.prototype), "removeEventListener", this).call(this, 'click', onClickFn);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      this.clickFns = [];
    }
  }, {
    key: "enable",
    value: function enable() {
      setBooleanAttribute(this, 'disabled', false);
    }
  }, {
    key: "disable",
    value: function disable() {
      setBooleanAttribute(this, 'disabled', true);
    }
  }, {
    key: "hide",
    value: function hide() {
      this.show = false;
      this.style.display = 'none';
    }
  }, {
    key: "display",
    value: function display() {
      this.show = true;
      this.style.display = 'block';
    }
  }], [{
    key: "define",
    value: function define() {
      customElements.define('ctx-menu-item', MenuItem, {
        "extends": 'button'
      });
    }
  }]);

  return MenuItem;
}( /*#__PURE__*/_wrapNativeSuper(HTMLButtonElement));
var context_menu_ContextMenu = /*#__PURE__*/function (_HTMLDivElement) {
  _inherits(ContextMenu, _HTMLDivElement);

  var _super2 = _createSuper(ContextMenu);

  /**
   * @param {string} classes
   */
  function ContextMenu(classes, onMenuItemClick) {
    var _thisSuper7, _thisSuper8, _thisSuper9, _this2;

    _classCallCheck(this, ContextMenu);

    _this2 = _super2.call(this);

    _get((_thisSuper7 = _assertThisInitialized(_this2), _getPrototypeOf(ContextMenu.prototype)), "setAttribute", _thisSuper7).call(_thisSuper7, 'class', classes);

    _get((_thisSuper8 = _assertThisInitialized(_this2), _getPrototypeOf(ContextMenu.prototype)), "style", _thisSuper8).position = 'absolute';

    _get((_thisSuper9 = _assertThisInitialized(_this2), _getPrototypeOf(ContextMenu.prototype)), "classList", _thisSuper9).add(CXT_MENU_CSS_CLASS); // Called when a menu item is clicked


    _this2.onMenuItemClick = function () {
      _this2.hide();

      onMenuItemClick;
    };

    return _this2;
  }

  _createClass(ContextMenu, [{
    key: "hide",
    value: function hide() {
      this.style.display = 'none';
    }
  }, {
    key: "display",
    value: function display() {
      this.style.display = 'block';
    }
    /**
     * Hides all menu items
     */

  }, {
    key: "hideMenuItems",
    value: function hideMenuItems() {
      var _iterator2 = context_menu_createForOfIteratorHelper(this.children),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var item = _step2.value;

          if (item instanceof HTMLElement) {
            item.style.display = 'none';
          } else {
            console.warn("".concat(item, " is not a HTMLElement"));
          }
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
    }
    /**
     * 
     * @param { MenuItem } menuItem 
     */

  }, {
    key: "appendMenuItem",
    value: function appendMenuItem(menuItem) {
      _get(_getPrototypeOf(ContextMenu.prototype), "appendChild", this).call(this, menuItem); // Bind click function to menuItem


      menuItem.bindOnClickFunction(this.onMenuItemClick);
    }
  }, {
    key: "insertBeforeExistingMenuItem",
    value: function insertBeforeExistingMenuItem(menuItem, existingItemID) {
      var existingItem = document.getElementById(existingItemID);

      if (existingItem.parentNode === this) {
        this.insertBefore(menuItem, existingItem);
      } else {
        throw new Error("The item with id='".concat(existingItemID, "' is not a child of the context menu"));
      }
    }
    /**
     * @param { MenuItem } menuItem 
     */

  }, {
    key: "removeMenuItem",
    value: function removeMenuItem(menuItem) {
      if (menuItem.parentNode === this) {
        this.removeChild(menuItem);
      } else {
        throw new Error("The item with id='".concat(menuItem.id, "' is not a child of the context menu"));
      }
    }
    /**
     * Moves a menuItem before another
     * @param { string } menuItemID 
     * @param { string } otherMenuItemID 
     */

  }, {
    key: "moveBefore",
    value: function moveBefore(menuItemID, otherMenuItemID) {
      if (menuItemID === otherMenuItemID) {
        return;
      }

      var menuItem = document.getElementById(menuItemID);
      var otherMenuItem = document.getElementById(otherMenuItemID);

      if (menuItem.parentNode !== this) {
        throw new Error("The item with id='".concat(menuItemID, "' is not a child of context menu"));
      }

      if (otherMenuItem.parentNode !== this) {
        throw new Error("The item with id='".concat(otherMenuItemID, "' is not a child of context menu"));
      }

      this.removeChild(menuItem);
      this.insertBefore(menuItem, otherMenuItem);
    }
  }], [{
    key: "define",
    value: function define() {
      customElements.define('ctx-menu', ContextMenu, {
        "extends": 'div'
      });
    }
  }]);

  return ContextMenu;
}( /*#__PURE__*/_wrapNativeSuper(HTMLDivElement));
// CONCATENATED MODULE: ./src/cytoscape-context-menus.js
function cytoscape_context_menus_createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = cytoscape_context_menus_unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function cytoscape_context_menus_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return cytoscape_context_menus_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return cytoscape_context_menus_arrayLikeToArray(o, minLen); }

function cytoscape_context_menus_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }




function contextMenus(opts) {
  var cy = this; // Initilize scratch pad

  if (!cy.scratch('cycontextmenus')) {
    cy.scratch('cycontextmenus', {});
  }

  var getScratchProp = function getScratchProp(propname) {
    return cy.scratch('cycontextmenus')[propname];
  };

  var setScratchProp = function setScratchProp(propname, value) {
    return cy.scratch('cycontextmenus')[propname] = value;
  };

  var options = getScratchProp('options');
  /** @type { ContextMenu } */

  var cxtMenu = getScratchProp('cxtMenu'); // Get string representation of css classes

  var getMenuItemClassStr = function getMenuItemClassStr(classes, hasTrailingDivider) {
    var str = getClassStr(classes);
    str += ' ' + MENUITEM_CSS_CLASS;

    if (hasTrailingDivider) {
      str += ' ' + DIVIDER_CSS_CLASS;
    }

    return str;
  };
  /**
   * 
   * @param { MenuItem } component 
   * @param {*} onClickFcn 
   */


  var bindOnClickFunction = function bindOnClickFunction(component, onClickFcn) {
    var callOnClickFn = function callOnClickFn() {
      onClickFcn(getScratchProp('currentCyEvent'));
    };

    component.bindOnClickFunction(callOnClickFn);
  };
  /**
   * @param { MenuItem } menuItem 
   */


  var bindCyCxttap = function bindCyCxttap(menuItem, selector, coreAsWell) {
    var _cxtfcn = function _cxtfcn(event) {
      setScratchProp('currentCyEvent', event);
      adjustCxtMenu(event); // adjust the position of context menu

      if (menuItem.show) {
        if (!isElementVisible(cxtMenu)) {
          cxtMenu.display();
        } // anyVisibleChild indicates if there is any visible child of context menu if not do not show the context menu


        setScratchProp('anyVisibleChild', true); // there is visible child

        menuItem.display();
      } // If there is no visible element hide the context menu as well(If it is visible)


      if (!getScratchProp('anyVisibleChild') && isElementVisible(cxtMenu)) {
        cxtMenu.hide();
      }
    };

    var cxtfcn;
    var cxtCoreFcn;

    if (coreAsWell) {
      cy.on(options.evtType, cxtCoreFcn = function cxtCoreFcn(event) {
        var target = event.target || event.cyTarget;

        if (target != cy) {
          return;
        }

        _cxtfcn(event);
      });
    }

    if (selector) {
      cy.on(options.evtType, selector, cxtfcn = function cxtfcn(event) {
        _cxtfcn(event);
      });
    } // Bind the event to menu item to be able to remove it back


    menuItem.data['cy-context-menus-cxtfcn'] = cxtfcn;
    menuItem.data['cy-context-menus-cxtcorefcn'] = cxtCoreFcn;
  };

  var bindCyEvents = function bindCyEvents() {
    var eventCyTapStart = function eventCyTapStart() {
      cxtMenu.hide();
      setScratchProp('cxtMenuPosition', undefined);
      setScratchProp('currentCyEvent', undefined);
    };

    setScratchProp('eventCyTapStart', eventCyTapStart);
    cy.on('tapstart', eventCyTapStart);
  };
  /**
   * @param { MenuItem } menuItem 
   */


  var performBindings = function performBindings(menuItem, onClickFcn, selector, coreAsWell) {
    bindOnClickFunction(menuItem, onClickFcn);
    bindCyCxttap(menuItem, selector, coreAsWell);
  }; // Adjusts context menu if necessary


  var adjustCxtMenu = function adjustCxtMenu(event) {
    var container = cy.container();
    var currentCxtMenuPosition = getScratchProp('cxtMenuPosition');
    var cyPos = event.position || event.cyPosition;

    if (currentCxtMenuPosition != cyPos) {
      cxtMenu.hideMenuItems();
      setScratchProp('anyVisibleChild', false); // we hide all children there is no visible child remaining

      setScratchProp('cxtMenuPosition', cyPos);
      var containerPos = getOffset(container);
      var renderedPos = event.renderedPosition || event.cyRenderedPosition;
      var borderWidth = getComputedStyle(container)['border-width'];
      var borderThickness = parseInt(borderWidth.replace("px", "")) || 0;

      if (borderThickness > 0) {
        containerPos.top += borderThickness;
        containerPos.left += borderThickness;
      }

      var containerHeight = container.clientHeight;
      var containerWidth = container.clientWidth;
      var horizontalSplit = containerHeight / 2;
      var verticalSplit = containerWidth / 2;
      var windowHeight = window.innerHeight;
      var windowWidth = window.innerWidth; //When user clicks on bottom-left part of window

      if (renderedPos.y > horizontalSplit && renderedPos.x <= verticalSplit) {
        cxtMenu.style.left = renderedPos.x + containerPos.left + 'px';
        cxtMenu.style.bottom = windowHeight - (containerPos.top + renderedPos.y) + 'px';
        cxtMenu.style.right = "auto";
        cxtMenu.style.top = "auto";
      } else if (renderedPos.y > horizontalSplit && renderedPos.x > verticalSplit) {
        cxtMenu.style.right = windowWidth - (containerPos.left + renderedPos.x) + 'px';
        cxtMenu.style.bottom = windowHeight - (containerPos.top + renderedPos.y) + 'px';
        cxtMenu.style.left = "auto";
        cxtMenu.style.top = "auto";
      } else if (renderedPos.y <= horizontalSplit && renderedPos.x <= verticalSplit) {
        cxtMenu.style.left = renderedPos.x + containerPos.left + 'px';
        cxtMenu.style.top = renderedPos.y + containerPos.top + 'px';
        cxtMenu.style.right = "auto";
        cxtMenu.style.bottom = "auto";
      } else {
        cxtMenu.style.right = windowWidth - (renderedPos.x + containerPos.left) + 'px';
        cxtMenu.style.top = renderedPos.y + containerPos.top + 'px';
        cxtMenu.style.left = "auto";
        cxtMenu.style.bottom = "auto";
      }
    }
  };

  var createAndAppendMenuItemComponent = function createAndAppendMenuItemComponent(opts) {
    // Create and append menu item
    var menuItemComponent = createMenuItemComponent(opts);
    cxtMenu.appendMenuItem(menuItemComponent);
    performBindings(menuItemComponent, opts.onClickFunction, opts.selector, opts.coreAsWell);
  }; //insertComponentBeforeExistingItem(component, existingItemID)


  var createAndAppendMenuItemComponents = function createAndAppendMenuItemComponents(optionsArr) {
    for (var i = 0; i < optionsArr.length; i++) {
      createAndAppendMenuItemComponent(optionsArr[i]);
    }
  };

  var createAndInsertMenuItemComponentBeforeExistingComponent = function createAndInsertMenuItemComponentBeforeExistingComponent(opts, existingComponentID) {
    // Create and insert menu item
    var menuItemComponent = createMenuItemComponent(opts);
    cxtMenu.insertBeforeExistingMenuItem(menuItemComponent, existingComponentID);
    performBindings(menuItemComponent, opts.onClickFunction, opts.selector, opts.coreAsWell);
  }; // Creates a menu item as an html component


  var createMenuItemComponent = function createMenuItemComponent(opts) {
    opts.className = getMenuItemClassStr(options.menuItemClasses, opts.hasTrailingDivider);
    return new context_menu_MenuItem(opts);
  };

  var destroyCxtMenu = function destroyCxtMenu() {
    if (!getScratchProp('active')) {
      return;
    }

    removeAndUnbindMenuItems();
    cy.off('tapstart', getScratchProp('eventCyTapStart'));
    cxtMenu.parentNode.removeChild(cxtMenu);
    cxtMenu = undefined;
    setScratchProp(cxtMenu, undefined);
    setScratchProp('active', false);
    setScratchProp('anyVisibleChild', false);
  };

  var removeAndUnbindMenuItems = function removeAndUnbindMenuItems() {
    var _iterator = cytoscape_context_menus_createForOfIteratorHelper(cxtMenu.children),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var child = _step.value;
        removeAndUnbindMenuItem(child.getAttribute('id'));
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  };

  var removeAndUnbindMenuItem = function removeAndUnbindMenuItem(menuItemID) {
    var menuItem = typeof menuItemID === 'string' ? document.getElementById(menuItemID) : menuItemID;

    if (menuItem instanceof context_menu_MenuItem) {
      var selector = menuItem.selector;
      var cxtfcn = menuItem.data['cy-context-menus-cxtfcn'];
      var cxtCoreFcn = menuItem.data['cy-context-menus-cxtcorefcn'];

      if (cxtfcn) {
        cy.off(options.evtType, selector, cxtfcn);
      }

      if (cxtCoreFcn) {
        cy.off(options.evtType, cxtCoreFcn);
      }

      menuItem.unbindOnClickFunctions();
      cxtMenu.removeMenuItem(menuItem);
    } else {
      throw new Error("The item with id='".concat(menuItemID, "' is not a menu item"));
    }
  }; // this sets disabled to true


  var _disableMenuItem = function disableMenuItem(menuItemID) {
    var menuItem = document.getElementById(menuItemID);

    if (menuItem instanceof context_menu_MenuItem) {
      menuItem.disable();
    } else {
      throw new Error("There is no menu item with id=".concat(menuItemID));
    }
  }; // this sets disabled to false by removing


  var _enableMenuItem = function enableMenuItem(menuItemID) {
    var menuItem = document.getElementById(menuItemID);

    if (menuItem instanceof context_menu_MenuItem) {
      menuItem.enable();
    } else {
      throw new Error("There is no menu item with id=".concat(menuItemID));
    }
  };

  var _setTrailingDivider = function setTrailingDivider(componentID, status) {
    var component = document.getElementById(componentID);

    if (status) {
      component.classList.add(DIVIDER_CSS_CLASS);
    } else {
      component.classList.remove(DIVIDER_CSS_CLASS);
    }
  }; // Get an extension instance to enable users to access extension methods


  var getInstance = function getInstance(cy) {
    var instance = {
      // Returns whether the extension is active
      isActive: function isActive() {
        return getScratchProp('active');
      },
      // Appends given menu item to the menu items list.
      appendMenuItem: function appendMenuItem(item) {
        createAndAppendMenuItemComponent(item);
        return cy;
      },
      // Appends menu items in the given list to the menu items list.
      appendMenuItems: function appendMenuItems(items) {
        createAndAppendMenuItemComponents(items);
        return cy;
      },
      // Removes the menu item with given ID.
      removeMenuItem: function removeMenuItem(itemID) {
        removeAndUnbindMenuItem(itemID);
        return cy;
      },
      // Sets whether the menuItem with given ID will have a following divider.
      setTrailingDivider: function setTrailingDivider(itemID, status) {
        _setTrailingDivider(itemID, status);

        return cy;
      },
      // Inserts given item before the existingitem.
      insertBeforeMenuItem: function insertBeforeMenuItem(item, existingItemID) {
        createAndInsertMenuItemComponentBeforeExistingComponent(item, existingItemID);
        return cy;
      },
      // Moves the item with given ID before the existingitem.
      moveBeforeOtherMenuItem: function moveBeforeOtherMenuItem(itemID, existingItemID) {
        cxtMenu.moveBefore(itemID, existingItemID);
        return cy;
      },
      // Disables the menu item with given ID.
      disableMenuItem: function disableMenuItem(itemID) {
        _disableMenuItem(itemID);

        return cy;
      },
      // Enables the menu item with given ID.
      enableMenuItem: function enableMenuItem(itemID) {
        _enableMenuItem(itemID);

        return cy;
      },
      // Disables the menu item with given ID.
      hideMenuItem: function hideMenuItem(itemID) {
        var menuItem = document.getElementById(itemID);

        if (menuItem instanceof context_menu_MenuItem) {
          menuItem.hide();
        }

        return cy;
      },
      // Enables the menu item with given ID.
      showMenuItem: function showMenuItem(itemID) {
        var menuItem = document.getElementById(itemID);

        if (menuItem instanceof context_menu_MenuItem) {
          menuItem.display();
        }

        return cy;
      },
      // Destroys the extension instance
      destroy: function destroy() {
        destroyCxtMenu();
        return cy;
      }
    };
    return instance;
  };

  if (opts !== 'get') {
    // https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements
    context_menu_MenuItem.define();
    context_menu_ContextMenu.define(); // merge the options with default ones

    options = extend(DEFAULT_OPTS, opts);
    setScratchProp('options', options); // Clear old context menu if needed

    if (getScratchProp('active')) {
      destroyCxtMenu();
    }

    setScratchProp('active', true); // Create cxtMenu and append it to body

    var classes = getClassStr(options.contextMenuClasses);

    var onMenuItemClick = function onMenuItemClick() {
      return setScratchProp('cxtMenuPosition', undefined);
    };

    cxtMenu = new context_menu_ContextMenu(classes, onMenuItemClick);
    setScratchProp('cxtMenu', cxtMenu);
    document.body.appendChild(cxtMenu);
    var menuItems = options.menuItems;
    createAndAppendMenuItemComponents(menuItems);
    bindCyEvents();
    preventDefaultContextTap();
  }

  return getInstance(this);
}
// CONCATENATED MODULE: ./src/index.js

function register(cytoscape) {
  if (!cytoscape) {
    return;
  } // can't register if cytoscape unspecified


  cytoscape('core', 'contextMenus', contextMenus);
} // @ts-ignore

if (typeof cytoscape !== 'undefined') {
  // Register for plain javascript
  // @ts-ignore
  register(cytoscape);
}

/***/ })
/******/ ]);
});