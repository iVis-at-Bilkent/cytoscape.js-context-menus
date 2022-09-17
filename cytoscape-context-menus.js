(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["cytoscapeContextMenus"] = factory();
	else
		root["cytoscapeContextMenus"] = factory();
})(self, function() {
return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 621:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "contextMenus": () => (/* binding */ contextMenus)
});

;// CONCATENATED MODULE: ./src/utils.js
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
    // Arrays should be merged
    if (obj[_i] instanceof Array) {
      obj[_i] = obj[_i].concat(options[_i]);
    } else {
      obj[_i] = options[_i];
    }
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
/**
 * Returns true if the first parameter is inside the element
 * @param {*} param0 
 * @param { HTMLElement } element 
 */

function isIn(_ref, element) {
  var x = _ref.x,
      y = _ref.y;
  var rect = element.getBoundingClientRect();
  return x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;
}
/**
 * Get the dimensions from a hidden element
 * @param { HTMLElement } element
 */

function getDimensionsHidden(element) {
  // Temporarily show the element
  element.style.opacity = "0";
  element.style.display = "block";
  var rect = element.getBoundingClientRect(); // Hide back after getting the dimensions

  element.style.opacity = "1";
  element.style.display = "none";
  return rect;
}
/**
 * Defines a new custom html element
 * https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements
 * @param { string } name 
 * @param { * } klass
 * @param { string } extendsType 
 */

function defineCustomElement(name, klass, extendsType) {
  // We have to check otherwise it throws an exception if already added
  if (typeof customElements.get(name) === 'undefined') {
    customElements.define(name, klass, {
      "extends": extendsType
    });
  }
}
;// CONCATENATED MODULE: ./src/constants.js
var CXT_MENU_CSS_CLASS = 'cy-context-menus-cxt-menu';
var MENUITEM_CSS_CLASS = 'cy-context-menus-cxt-menuitem';
var DIVIDER_CSS_CLASS = 'cy-context-menus-divider';
var INDICATOR_CSS_CLASS = 'cy-context-menus-submenu-indicator';
var DEFAULT_OPTS = {
  // Customize event to bring up the context menu
  // Possible options https://js.cytoscape.org/#events/user-input-device-events
  evtType: 'cxttap',
  // determines when a submenu opens: 'hover' or 'click' 
  submenuEvtType: 'hover',
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
  menuItemClasses: [MENUITEM_CSS_CLASS],
  // css classes that context menu will have
  contextMenuClasses: [CXT_MENU_CSS_CLASS],
  submenuIndicator: {
    src: 'assets/submenu-indicator-default.svg',
    width: 12,
    height: 12
  }
};
;// CONCATENATED MODULE: ./src/context-menu.js
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function context_menu_createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = context_menu_unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function context_menu_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return context_menu_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return context_menu_arrayLikeToArray(o, minLen); }

function context_menu_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }


 // TODO: add submenu property

function stopEvent(event) {
  event.preventDefault();
  event.stopPropagation();
}

var MenuItem = /*#__PURE__*/function (_HTMLButtonElement) {
  _inherits(MenuItem, _HTMLButtonElement);

  var _super = _createSuper(MenuItem);

  /**
   * @param {{
   *      id: string;
   *      tooltipText?: string;
   *      disabled?: boolean;
   *      image?: {
   *          src: string;
   *          width: number;
   *          height: number;
   *          y: string;
   *          x: string;
   *      };
   *      content: string;
   *      selector: string;
   *      show?: boolean;
   *      submenu?: Array;
   *      coreAsWell?: boolean;
   *      onClickFunction?: any;
   *      hasTrailingDivider?: boolean;
   * }} params
   * @param { * } onMenuItemClick
   * passed so that submenu items can have this
   * called when the menu item is clicked
   */
  function MenuItem(params, onMenuItemClick, scratchpad) {
    var _params$tooltipText;

    var _thisSuper, _thisSuper2, _thisSuper3, _thisSuper4, _thisSuper5, _thisSuper6, _thisSuper7, _thisSuper8, _this;

    _classCallCheck(this, MenuItem);

    _this = _super.call(this);

    _get((_thisSuper = _assertThisInitialized(_this), _getPrototypeOf(MenuItem.prototype)), "setAttribute", _thisSuper).call(_thisSuper, 'id', params.id);

    var className = _this._getMenuItemClassStr(scratchpad['cxtMenuItemClasses'], params.hasTrailingDivider);

    _get((_thisSuper2 = _assertThisInitialized(_this), _getPrototypeOf(MenuItem.prototype)), "setAttribute", _thisSuper2).call(_thisSuper2, 'class', className);

    _get((_thisSuper3 = _assertThisInitialized(_this), _getPrototypeOf(MenuItem.prototype)), "setAttribute", _thisSuper3).call(_thisSuper3, 'title', (_params$tooltipText = params.tooltipText) !== null && _params$tooltipText !== void 0 ? _params$tooltipText : "");

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

    _this.innerHTML += params.content;
    _this.onMenuItemClick = onMenuItemClick;
    _this.data = {};
    _this.clickFns = [];
    _this.selector = params.selector;
    _this.hasTrailingDivider = params.hasTrailingDivider;
    _this.show = typeof params.show === 'undefined' || params.show;
    _this.coreAsWell = params.coreAsWell || false;
    _this.scratchpad = scratchpad;

    if (typeof params.onClickFunction === 'undefined' && typeof params.submenu === 'undefined') {
      throw new Error("A menu item must either have click function or a submenu or both");
    }

    _this.onClickFunction = params.onClickFunction; // Create the submenu if neccessary

    if (params.submenu instanceof Array) {
      _this._createSubmenu(params.submenu);
    }

    _get((_thisSuper5 = _assertThisInitialized(_this), _getPrototypeOf(MenuItem.prototype)), "addEventListener", _thisSuper5).call(_thisSuper5, 'mousedown', stopEvent);

    _get((_thisSuper6 = _assertThisInitialized(_this), _getPrototypeOf(MenuItem.prototype)), "addEventListener", _thisSuper6).call(_thisSuper6, 'mouseup', stopEvent);

    _get((_thisSuper7 = _assertThisInitialized(_this), _getPrototypeOf(MenuItem.prototype)), "addEventListener", _thisSuper7).call(_thisSuper7, 'touchstart', stopEvent);

    _get((_thisSuper8 = _assertThisInitialized(_this), _getPrototypeOf(MenuItem.prototype)), "addEventListener", _thisSuper8).call(_thisSuper8, 'touchend', stopEvent);

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

      if (this.hasSubmenu()) {
        if (this.scratchpad.options.submenuEvtType === 'click') {
          this.addEventListener('mousedown', this.mouseEnterHandler);
        } else {
          this.addEventListener('mouseenter', this.mouseEnterHandler);
        }
      }
    }
  }, {
    key: "disable",
    value: function disable() {
      setBooleanAttribute(this, 'disabled', true);

      if (this.hasSubmenu()) {
        if (this.scratchpad.options.submenuEvtType === 'click') {
          this.removeEventListener('mousedown', this.mouseEnterHandler);
        } else {
          this.removeEventListener('mouseenter', this.mouseEnterHandler);
        }
      }
    }
  }, {
    key: "hide",
    value: function hide() {
      this.show = false;
      this.style.display = 'none';
    }
  }, {
    key: "getHasTrailingDivider",
    value: function getHasTrailingDivider() {
      // may be undefined so use this way
      return this.hasTrailingDivider ? true : false;
    }
    /**
     * @param {boolean} status 
     */

  }, {
    key: "setHasTrailingDivider",
    value: function setHasTrailingDivider(status) {
      this.hasTrailingDivider = status;
    }
  }, {
    key: "hasSubmenu",
    value: function hasSubmenu() {
      return this.submenu instanceof MenuItemList;
    }
  }, {
    key: "appendSubmenuItem",
    value: function appendSubmenuItem(menuItem) {
      var before = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;

      if (!this.hasSubmenu()) {
        this._createSubmenu();
      }

      this.submenu.appendMenuItem(menuItem, before);
    }
  }, {
    key: "isClickable",
    value: function isClickable() {
      return this.onClickFunction !== undefined;
    }
  }, {
    key: "display",
    value: function display() {
      this.show = true;
      this.style.display = 'block';
    }
    /**
     * Returns true if this menu item is currently visible
     */

  }, {
    key: "isVisible",
    value: function isVisible() {
      return this.show === true && this.style.display !== 'none';
    }
    /**
     * Removes the submenu if exists
     */

  }, {
    key: "removeSubmenu",
    value: function removeSubmenu() {
      if (this.hasSubmenu()) {
        this.submenu.removeAllMenuItems();
        this.detachSubmenu();
      }
    }
  }, {
    key: "detachSubmenu",
    value: function detachSubmenu() {
      if (this.hasSubmenu()) {
        this.removeChild(this.submenu);
        this.removeChild(this.indicator);

        if (this.scratchpad.options.submenuEvtType === 'click') {
          this.removeEventListener('mousedown', this.mouseEnterHandler);
        } else {
          this.removeEventListener('mouseenter', this.mouseEnterHandler);
        }

        this.removeEventListener('mouseleave', this.mouseLeaveHandler);
        this.submenu = undefined;
        this.indicator = undefined;
      }
    }
  }, {
    key: "_onMouseEnter",
    value: function _onMouseEnter(_event) {
      var rect = this.getBoundingClientRect();
      var submenuRect = getDimensionsHidden(this.submenu);
      var exceedsRight = rect.right + submenuRect.width > window.innerWidth;
      var exceedsBottom = rect.top + submenuRect.height > window.innerHeight; // Adjusts the position of the submenu

      if (!exceedsRight && !exceedsBottom) {
        this.submenu.style.left = this.clientWidth + "px";
        this.submenu.style.top = "0px";
        this.submenu.style.right = "auto";
        this.submenu.style.bottom = "auto";
      } else if (exceedsRight && !exceedsBottom) {
        this.submenu.style.right = this.clientWidth + "px";
        this.submenu.style.top = "0px";
        this.submenu.style.left = "auto";
        this.submenu.style.bottom = "auto";
      } else if (exceedsRight && exceedsBottom) {
        this.submenu.style.right = this.clientWidth + "px";
        this.submenu.style.bottom = "0px";
        this.submenu.style.top = "auto";
        this.submenu.style.left = "auto";
      } else {
        this.submenu.style.left = this.clientWidth + "px";
        this.submenu.style.bottom = "0px";
        this.submenu.style.right = "auto";
        this.submenu.style.top = "auto";
      }

      this.submenu.display(); //todo

      console.log(this.parentElement.children);
      var submenus = this.parentElement.children; // Remove trailing divider from last visible menu item if it has it.
      // For other visible items, add divider if the associated menu item
      // should have divider, i.e, it was last item at some point and
      // the divider was removed but it should be there when the item
      // is not last

      var visibleItems = Array.from(this.submenu.children).filter(function (item) {
        if (item instanceof MenuItem) return item.isVisible();
      });
      var length = visibleItems.length;
      visibleItems.forEach(function (item, index) {
        if (!(item instanceof MenuItem)) return;

        if (index < length - 1 && item.getHasTrailingDivider()) {
          item.classList.add(DIVIDER_CSS_CLASS);
        } else if (item.getHasTrailingDivider()) {
          item.classList.remove(DIVIDER_CSS_CLASS);
        }

        ;
      });
      var currentMenuItems = Array.from(this.parentElement.children).filter(function (item) {
        if (item instanceof MenuItem) return item.isVisible();
      });
      console.log(currentMenuItems);
      currentMenuItems.forEach(function (item, index) {
        if (!(item instanceof MenuItem)) return;

        if (item.hasSubmenu()) {
          item.submenu.hide();
        }
      });
      this.submenu.display();
    }
  }, {
    key: "_onMouseLeave",
    value: function _onMouseLeave(event) {
      var pos = {
        x: event.clientX,
        y: event.clientY
      }; // Hide if mouse is not passed to the submenu

      if (!isIn(pos, this.submenu)) {
        this.submenu.hide();
      }
    }
  }, {
    key: "_createSubmenu",
    value: function _createSubmenu() {
      var items = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      // We generate another indicator for each
      this.indicator = this.scratchpad['submenuIndicatorGen']();
      this.submenu = new MenuItemList(this.onMenuItemClick, this.scratchpad);
      this.appendChild(this.indicator);
      this.appendChild(this.submenu);

      var _iterator2 = context_menu_createForOfIteratorHelper(items),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var item = _step2.value;
          var menuItem = new MenuItem(item, this.onMenuItemClick, this.scratchpad);
          this.submenu.appendMenuItem(menuItem);
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }

      this.mouseEnterHandler = this._onMouseEnter.bind(this);
      this.mouseLeaveHandler = this._onMouseLeave.bind(this); // submenu should be visible when mouse is over
      // ho0384 todo

      if (this.scratchpad.options.submenuEvtType === 'click') {
        this.addEventListener('mousedown', this.mouseEnterHandler);
      } else {
        this.addEventListener('mouseenter', this.mouseEnterHandler);
        this.addEventListener('mouseleave', this.mouseLeaveHandler);
      }
    } // TODO: can be static

  }, {
    key: "_getMenuItemClassStr",
    value: function _getMenuItemClassStr(classStr, hasTrailingDivider) {
      return hasTrailingDivider ? classStr + ' ' + DIVIDER_CSS_CLASS : classStr;
    }
  }], [{
    key: "define",
    value: function define() {
      defineCustomElement('ctx-menu-item', MenuItem, 'button');
    }
  }]);

  return MenuItem;
}( /*#__PURE__*/_wrapNativeSuper(HTMLButtonElement));
var MenuItemList = /*#__PURE__*/function (_HTMLDivElement) {
  _inherits(MenuItemList, _HTMLDivElement);

  var _super2 = _createSuper(MenuItemList);

  function MenuItemList(onMenuItemClick, scratchpad) {
    var _thisSuper9, _this2;

    _classCallCheck(this, MenuItemList);

    _this2 = _super2.call(this);

    _get((_thisSuper9 = _assertThisInitialized(_this2), _getPrototypeOf(MenuItemList.prototype)), "setAttribute", _thisSuper9).call(_thisSuper9, 'class', scratchpad['cxtMenuClasses']);

    _this2.style.position = 'absolute';
    _this2.onMenuItemClick = onMenuItemClick;
    _this2.scratchpad = scratchpad;
    return _this2;
  }

  _createClass(MenuItemList, [{
    key: "hide",
    value: function hide() {
      if (this.isVisible()) {
        this.hideSubmenus();
        this.style.display = 'none';
      }
    }
  }, {
    key: "display",
    value: function display() {
      this.style.display = 'block';
    }
  }, {
    key: "isVisible",
    value: function isVisible() {
      return this.style.display !== 'none';
    }
    /**
     * Hides all menu items
     */

  }, {
    key: "hideMenuItems",
    value: function hideMenuItems() {
      var _iterator3 = context_menu_createForOfIteratorHelper(this.children),
          _step3;

      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var item = _step3.value;

          if (item instanceof HTMLElement) {
            item.style.display = 'none';
          } else {
            console.warn("".concat(item, " is not a HTMLElement"));
          }
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }
    }
  }, {
    key: "hideSubmenus",
    value: function hideSubmenus() {
      var _iterator4 = context_menu_createForOfIteratorHelper(this.children),
          _step4;

      try {
        for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
          var menuItem = _step4.value;

          if (menuItem instanceof MenuItem) {
            if (menuItem.submenu) {
              menuItem.submenu.hide();
            }
          }
        }
      } catch (err) {
        _iterator4.e(err);
      } finally {
        _iterator4.f();
      }
    }
    /**
     * @param { MenuItem } menuItem
     * @param { Element? } before
     * If before is specified menuItem is inserted before this element instead of at the end \
     * By default appends at the end of the this
     */

  }, {
    key: "appendMenuItem",
    value: function appendMenuItem(menuItem) {
      var before = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;

      if (typeof before !== 'undefined') {
        if (before.parentNode === this) {
          this.insertBefore(menuItem, before);
        } else {
          throw new Error("The item with id='".concat(before.id, "' is not a child of the context menu"));
        }
      } else {
        this.appendChild(menuItem);
      }

      if (menuItem.isClickable()) {
        this._performBindings(menuItem);
      }
    }
    /**
     * Removes any menuItem that is any children of the context menu
     * Returns true if child is found and removed, false otherwise
     * @param { MenuItem } menuItem
     */

    /* removeMenuItem(menuItem) {
        if (this._removeImmediateMenuItem(menuItem)) {
            return true;
        } else {
            for (let child of this.children) {
                if (child instanceof MenuItem && child.hasSubmenu()) {
                    if (child.submenu.removeMenuItem(menuItem)) {
                        return true;
                    }
                }
            }
            // throw new Error(`The item with id='${menuItem.id}' is not a child of the context menu`);
            return false;
        }
    } */

    /**
     * Moves a menuItem before another
     * @param { MenuItem } menuItem
     * @param { MenuItem } before
     */

  }, {
    key: "moveBefore",
    value: function moveBefore(menuItem, before) {
      if (menuItem.parentNode !== this) {
        throw new Error("The item with id='".concat(menuItem.id, "' is not a child of context menu"));
      }

      if (before.parentNode !== this) {
        throw new Error("The item with id='".concat(before.id, "' is not a child of context menu"));
      }

      this.removeChild(menuItem);
      this.insertBefore(menuItem, before);
    }
  }, {
    key: "removeAllMenuItems",
    value: function removeAllMenuItems() {
      // https://stackoverflow.com/a/3955238/12045421
      while (this.firstChild) {
        var child = this.lastChild;

        if (child instanceof MenuItem) {
          this._removeImmediateMenuItem(child);
        } else {
          console.warn("Found non menu item in the context menu: ", child); // Remove it as well

          this.removeChild(child);
        }
      }
    }
    /**
     * Removes if the `menuItem` is direct child of the parent
     * @param { MenuItem } menuItem
     */

  }, {
    key: "_removeImmediateMenuItem",
    value: function _removeImmediateMenuItem(menuItem) {
      if (this._detachImmediateMenuItem(menuItem)) {
        menuItem.detachSubmenu();
        menuItem.unbindOnClickFunctions();
      } else {
        throw new Error("menu item(id=".concat(menuItem.id, ") is not in the context menu"));
      }
    }
    /**
     * Detaches `menuItem` from `this` doesn't destroy it
     * @param { MenuItem } menuItem
     * @returns { boolean }
     */

  }, {
    key: "_detachImmediateMenuItem",
    value: function _detachImmediateMenuItem(menuItem) {
      if (menuItem.parentNode === this) {
        this.removeChild(menuItem);

        if (this.children.length <= 0) {
          var parent = this.parentNode;

          if (parent instanceof MenuItem) {
            parent.detachSubmenu();
          }
        }

        return true;
      } else {
        return false;
      }
    }
    /**
     * @param { MenuItem } menuItem
     */

  }, {
    key: "_performBindings",
    value: function _performBindings(menuItem) {
      var callback = this._bindOnClick(menuItem.onClickFunction);

      menuItem.bindOnClickFunction(callback);
      menuItem.bindOnClickFunction(this.onMenuItemClick);
    }
  }, {
    key: "_bindOnClick",
    value: function _bindOnClick(onClickFn) {
      var _this3 = this;

      return function () {
        var event = _this3.scratchpad['currentCyEvent'];
        onClickFn(event);
      };
    }
  }], [{
    key: "define",
    value: function define() {
      defineCustomElement('menu-item-list', MenuItemList, 'div');
    }
  }]);

  return MenuItemList;
}( /*#__PURE__*/_wrapNativeSuper(HTMLDivElement));
var ContextMenu = /*#__PURE__*/function (_MenuItemList) {
  _inherits(ContextMenu, _MenuItemList);

  var _super3 = _createSuper(ContextMenu);

  function ContextMenu(onMenuItemClick, scratchpad) {
    var _this4;

    _classCallCheck(this, ContextMenu);

    _this4 = _super3.call(this, onMenuItemClick, scratchpad); // Called when a menu item is clicked

    _this4.onMenuItemClick = function (event) {
      // So that parent menuItems won't be clicked
      stopEvent(event);

      _this4.hide();

      onMenuItemClick();
    };
    /* this.addEventListener('mouseleave', (_event) => {
        this.hideMenuItemSubmenus();
    }); */


    return _this4;
  }
  /**
   * @param { MenuItem } menuItem
   */


  _createClass(ContextMenu, [{
    key: "removeMenuItem",
    value: function removeMenuItem(menuItem) {
      var parent = menuItem.parentElement;

      if (parent instanceof MenuItemList && this.contains(parent)) {
        parent._removeImmediateMenuItem(menuItem);
      }
    }
    /**
     * @param { MenuItem } menuItem
     * @param { Element? } before
     */

  }, {
    key: "appendMenuItem",
    value: function appendMenuItem(menuItem) {
      var before = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
      this.ensureDoesntContain(menuItem.id);

      _get(_getPrototypeOf(ContextMenu.prototype), "appendMenuItem", this).call(this, menuItem, before);
    }
    /**
     * Inserts the menu item to the context menu \
     * If before is specified, item is inserted before the 'before' inside the same submenu \
     * The parent argument is ignored if before is specified because parent can be inferred from the before argument \
     * If parent is specified, item is inserted into the submenu of specified parent
     * @param { MenuItem } menuItem
     * @param {{ before?: MenuItem, parent?: MenuItem }} param1
     */

  }, {
    key: "insertMenuItem",
    value: function insertMenuItem(menuItem) {
      var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
          before = _ref.before,
          parent = _ref.parent;

      this.ensureDoesntContain(menuItem.id);

      if (typeof before !== 'undefined') {
        if (this.contains(before)) {
          var _parent = before.parentNode;

          if (_parent instanceof MenuItemList) {
            _parent.appendMenuItem(menuItem, before);
          } else {
            throw new Error("Parent of before(id=".concat(before.id, ") is not a submenu"));
          }
        } else {
          throw new Error("before(id=".concat(before.id, ") is not in the context menu"));
        }
      } else if (typeof parent !== 'undefined') {
        if (this.contains(parent)) {
          parent.appendSubmenuItem(menuItem);
        } else {
          throw new Error("parent(id=".concat(parent.id, ") is not a descendant of the context menu"));
        }
      } else {
        this.appendMenuItem(menuItem);
      }
    }
    /**
     * @param { MenuItem } menuItem
     * @param { MenuItem } before
     */

  }, {
    key: "moveBefore",
    value: function moveBefore(menuItem, before) {
      var parent = menuItem.parentElement;

      if (this.contains(parent)) {
        if (this.contains(before)) {
          parent.removeChild(menuItem);
          this.insertMenuItem(menuItem, {
            before: before
          });
        } else {
          throw new Error("before(id=".concat(before.id, ") is not in the context menu"));
        }
      } else {
        throw new Error("parent(id=".concat(parent.id, ") is not in the contex menu"));
      }
    }
    /**
     * @param { MenuItem } menuItem
     * @param { MenuItem } parent
     * @param { { selector?: string, coreAsWell: boolean } } options
     */

  }, {
    key: "moveToSubmenu",
    value: function moveToSubmenu(menuItem) {
      var parent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      var oldParent = menuItem.parentElement;

      if (oldParent instanceof MenuItemList) {
        if (this.contains(oldParent)) {
          // Assuming parameters are always correct since this is an internal function
          if (parent !== null) {
            if (this.contains(parent)) {
              oldParent._detachImmediateMenuItem(menuItem);

              parent.appendSubmenuItem(menuItem);
            } else {
              throw new Error("parent(id=".concat(parent.id, ") is not in the context menu"));
            }
          } else {
            if (options !== null) {
              menuItem.selector = options.selector;
              menuItem.coreAsWell = options.coreAsWell;
            }

            oldParent._detachImmediateMenuItem(menuItem);

            this.appendMenuItem(menuItem);
          }
        } else {
          throw new Error("parent of the menu item(id=".concat(oldParent.id, ") is not in the context menu"));
        }
      } else {
        throw new Error("current parent(id=".concat(oldParent.id, ") is not a submenu"));
      }
    }
  }, {
    key: "ensureDoesntContain",
    value: function ensureDoesntContain(id) {
      var elem = document.getElementById(id);

      if (typeof elem !== 'undefined' && this.contains(elem)) {
        throw new Error("There is already an element with id=".concat(id, " in the context menu"));
      }
    }
  }], [{
    key: "define",
    value: function define() {
      defineCustomElement('ctx-menu', ContextMenu, 'div');
    }
  }]);

  return ContextMenu;
}(MenuItemList);
;// CONCATENATED MODULE: ./src/cytoscape-context-menus.js
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

  var hasScratchProp = function hasScratchProp(propname) {
    return typeof cy.scratch('cycontextmenus')[propname] !== 'undefined';
  };

  var options = getScratchProp('options');
  /** @type { ContextMenu } */

  var cxtMenu = getScratchProp('cxtMenu');
  /**
   * Right click event
   */

  var bindOnCxttap = function bindOnCxttap() {
    // TODO: move this to ContextMenu, just do the binding here
    var onCxttap = function onCxttap(event) {
      setScratchProp('currentCyEvent', event);
      adjustCxtMenu(event); // adjust the position of context menu

      var target = event.target || event.cyTarget; // Check for each menuItem, if show is true, show the menuItem

      var _iterator = cytoscape_context_menus_createForOfIteratorHelper(cxtMenu.children),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var menuItem = _step.value;

          if (menuItem instanceof MenuItem) {
            var shouldDisplay = target === cy ? // If user clicked in cy area then show core items
            menuItem.coreAsWell : // If selector of the item matches then show
            target.is(menuItem.selector); // User clicked on empty area and menuItem is core

            if (shouldDisplay && menuItem.show) {
              cxtMenu.display(); // anyVisibleChild indicates if there is any visible child of context menu if not do not show the context menu

              setScratchProp('anyVisibleChild', true); // there is visible child

              menuItem.display();
            }
          }
        } // Remove trailing divider from last visible menu item if it has it.
        // For other visible items, add divider if the associated menu item
        // should have divider, i.e, it was last item at some point and
        // the divider was removed but it should be there when the item
        // is not last

      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      var visibleItems = Array.from(cxtMenu.children).filter(function (item) {
        if (item instanceof MenuItem) return item.isVisible();
      });
      var length = visibleItems.length;
      visibleItems.forEach(function (item, index) {
        if (!(item instanceof MenuItem)) return;

        if (index < length - 1 && item.getHasTrailingDivider()) {
          item.classList.add(DIVIDER_CSS_CLASS);
        } else if (item.getHasTrailingDivider()) {
          item.classList.remove(DIVIDER_CSS_CLASS);
        }

        ;
      });

      if (!getScratchProp('anyVisibleChild') && isElementVisible(cxtMenu)) {
        cxtMenu.hide();
      }
    };

    cy.on(options.evtType, onCxttap);
    setScratchProp('onCxttap', onCxttap);
  };

  var bindCyEvents = function bindCyEvents() {
    var eventCyTapStart = function eventCyTapStart(event) {
      if (cxtMenu.contains(event.originalEvent.target)) {
        return false;
      }

      cxtMenu.hide();
      setScratchProp('cxtMenuPosition', undefined);
      setScratchProp('currentCyEvent', undefined);
    };

    cy.on('tapstart', eventCyTapStart);
    setScratchProp('eventCyTapStart', eventCyTapStart);

    var eventCyViewport = function eventCyViewport() {
      cxtMenu.hide();
    };

    cy.on('viewport', eventCyViewport);
    setScratchProp('onViewport', eventCyViewport);
  }; // Hide callbacks outside the cytoscape canvas


  var bindHideCallbacks = function bindHideCallbacks() {
    var onClick = function onClick(event) {
      var cyContainer = cy.container(); // Hide only if click is outside of the Cytoscape area and the context menu

      if (!cyContainer.contains(event.target) && !cxtMenu.contains(event.target)) {
        cxtMenu.hide();
        setScratchProp('cxtMenuPosition', undefined);
      }
    };

    document.addEventListener('mouseup', onClick);
    setScratchProp('hideOnNonCyClick', onClick);
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
      var verticalSplit = containerWidth / 2; //When user clicks on bottom-left part of window

      if (renderedPos.y > horizontalSplit && renderedPos.x <= verticalSplit) {
        cxtMenu.style.left = renderedPos.x + 'px';
        cxtMenu.style.bottom = containerHeight - renderedPos.y + 'px';
        cxtMenu.style.right = "auto";
        cxtMenu.style.top = "auto";
      } else if (renderedPos.y > horizontalSplit && renderedPos.x > verticalSplit) {
        cxtMenu.style.right = containerWidth - renderedPos.x + 'px';
        cxtMenu.style.bottom = containerHeight - renderedPos.y + 'px';
        cxtMenu.style.left = "auto";
        cxtMenu.style.top = "auto";
      } else if (renderedPos.y <= horizontalSplit && renderedPos.x <= verticalSplit) {
        cxtMenu.style.left = renderedPos.x + 'px';
        cxtMenu.style.top = renderedPos.y + 'px';
        cxtMenu.style.right = "auto";
        cxtMenu.style.bottom = "auto";
      } else {
        cxtMenu.style.right = containerWidth - renderedPos.x + 'px';
        cxtMenu.style.top = renderedPos.y + 'px';
        cxtMenu.style.left = "auto";
        cxtMenu.style.bottom = "auto";
      }
    }
  };

  var createAndAppendMenuItemComponent = function createAndAppendMenuItemComponent(opts) {
    var parentID = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
    // Create and append menu item
    var menuItemComponent = createMenuItemComponent(opts);

    if (typeof parentID !== 'undefined') {
      var parent = asMenuItem(parentID);
      cxtMenu.insertMenuItem(menuItemComponent, {
        parent: parent
      });
    } else {
      cxtMenu.insertMenuItem(menuItemComponent);
    }
  }; //insertComponentBeforeExistingItem(component, existingItemID)


  var createAndAppendMenuItemComponents = function createAndAppendMenuItemComponents(optionsArr) {
    var parentID = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;

    for (var i = 0; i < optionsArr.length; i++) {
      createAndAppendMenuItemComponent(optionsArr[i], parentID);
    }
  }; // Creates a menu item as an html component


  var createMenuItemComponent = function createMenuItemComponent(opts) {
    var scratchpad = cy.scratch('cycontextmenus');
    return new MenuItem(opts, cxtMenu.onMenuItemClick, scratchpad);
  };

  var destroyCxtMenu = function destroyCxtMenu() {
    if (!getScratchProp('active')) {
      return;
    }

    cxtMenu.removeAllMenuItems();
    cy.off('tapstart', getScratchProp('eventCyTapStart'));
    cy.off(options.evtType, getScratchProp('onCxttap'));
    cy.off('viewport', getScratchProp('onViewport'));
    document.removeEventListener('mouseup', getScratchProp('hideOnNonCyClick'));
    cxtMenu.parentNode.removeChild(cxtMenu);
    cxtMenu = undefined;
    setScratchProp('cxtMenu', undefined);
    setScratchProp('active', false);
    setScratchProp('anyVisibleChild', false);
    setScratchProp('onCxttap', undefined);
    setScratchProp('onViewport', undefined);
    setScratchProp('hideOnNonCyClick', undefined);
  };

  var makeSubmenuIndicator = function makeSubmenuIndicator(props) {
    var elem = document.createElement('img');
    elem.src = props.src;
    elem.width = props.width;
    elem.height = props.height;
    elem.classList.add(INDICATOR_CSS_CLASS);
    return elem;
  };
  /**
   * @param { string } menuItemID
   */


  var asMenuItem = function asMenuItem(menuItemID) {
    var menuItem = document.getElementById(menuItemID);

    if (menuItem instanceof MenuItem) {
      return menuItem;
    } else {
      throw new Error("The item with id=".concat(menuItemID, " is not a menu item"));
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
        var parentID = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
        createAndAppendMenuItemComponent(item, parentID);
        return cy;
      },
      // Appends menu items in the given list to the menu items list.
      appendMenuItems: function appendMenuItems(items) {
        var parentID = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
        createAndAppendMenuItemComponents(items, parentID);
        return cy;
      },
      // Removes the menu item with given ID.
      removeMenuItem: function removeMenuItem(itemID) {
        var item = asMenuItem(itemID);
        cxtMenu.removeMenuItem(item);
        return cy;
      },
      // Sets whether the menuItem with given ID will have a following divider.
      setTrailingDivider: function setTrailingDivider(itemID, status) {
        var menuItem = asMenuItem(itemID);
        menuItem.setHasTrailingDivider(status);

        if (status) {
          menuItem.classList.add(DIVIDER_CSS_CLASS);
        } else {
          menuItem.classList.remove(DIVIDER_CSS_CLASS);
        }

        return cy;
      },
      // Inserts given item before the existingitem.
      insertBeforeMenuItem: function insertBeforeMenuItem(item, existingItemID) {
        var menuItemComponent = createMenuItemComponent(item);
        var existingItem = asMenuItem(existingItemID);
        cxtMenu.insertMenuItem(menuItemComponent, {
          before: existingItem
        });
        return cy;
      },
      // Moves the item to the submenu of the parent with the given ID
      moveToSubmenu: function moveToSubmenu(itemID) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
        var item = asMenuItem(itemID);

        if (options === null) {
          cxtMenu.moveToSubmenu(item);
        } else if (typeof options === 'string') {
          // options is parentID
          var parent = asMenuItem(options.toString());
          cxtMenu.moveToSubmenu(item, parent);
        } else if (typeof options.coreAsWell !== 'undefined' || typeof options.selector !== 'undefined') {
          cxtMenu.moveToSubmenu(item, null, options);
        } else {
          console.warn('options neither has coreAsWell nor selector property but it is an object. Are you sure that this is what you want to do?');
        }

        return cy;
      },
      // Moves the item with given ID before the existingitem.
      moveBeforeOtherMenuItem: function moveBeforeOtherMenuItem(itemID, existingItemID) {
        var item = asMenuItem(itemID);
        var before = asMenuItem(existingItemID);
        cxtMenu.moveBefore(item, before);
        return cy;
      },
      // Disables the menu item with given ID.
      disableMenuItem: function disableMenuItem(itemID) {
        var menuItem = asMenuItem(itemID);
        menuItem.disable();
        return cy;
      },
      // Enables the menu item with given ID.
      enableMenuItem: function enableMenuItem(itemID) {
        var menuItem = asMenuItem(itemID);
        menuItem.enable();
        return cy;
      },
      // Disables the menu item with given ID.
      hideMenuItem: function hideMenuItem(itemID) {
        var menuItem = asMenuItem(itemID);
        menuItem.hide();
        return cy;
      },
      // Enables the menu item with given ID.
      showMenuItem: function showMenuItem(itemID) {
        var menuItem = asMenuItem(itemID);
        menuItem.display();
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
    MenuItem.define();
    MenuItemList.define();
    ContextMenu.define(); // merge the options with default ones

    options = extend(DEFAULT_OPTS, opts);
    setScratchProp('options', options); // Clear old context menu if needed

    if (getScratchProp('active')) {
      destroyCxtMenu();
    }

    setScratchProp('active', true);
    setScratchProp('submenuIndicatorGen', makeSubmenuIndicator.bind(undefined, options.submenuIndicator)); // Create cxtMenu and append it to body

    var cxtMenuClasses = getClassStr(options.contextMenuClasses);
    setScratchProp('cxtMenuClasses', cxtMenuClasses);

    var onMenuItemClick = function onMenuItemClick() {
      return setScratchProp('cxtMenuPosition', undefined);
    };

    var scratchpad = cy.scratch('cycontextmenus');
    cxtMenu = new ContextMenu(onMenuItemClick, scratchpad);
    setScratchProp('cxtMenu', cxtMenu); //document.body.appendChild(cxtMenu);

    cy.container().appendChild(cxtMenu);
    setScratchProp('cxtMenuItemClasses', getClassStr(options.menuItemClasses));
    var menuItems = options.menuItems;
    createAndAppendMenuItemComponents(menuItems);
    bindOnCxttap();
    bindCyEvents();
    bindHideCallbacks();
    preventDefaultContextTap();
  }

  return getInstance(this);
}

/***/ }),

/***/ 579:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// We have to use CommonJS here https://stackoverflow.com/questions/33505992/babel-6-changes-how-it-exports-default
var _require = __webpack_require__(621),
    contextMenus = _require.contextMenus;

var register = function register(cytoscape) {
  if (!cytoscape) {
    return;
  } // can't register if cytoscape unspecified


  cytoscape('core', 'contextMenus', contextMenus);
}; // @ts-ignore


if (typeof cytoscape !== 'undefined') {
  // Register for plain javascript
  // @ts-ignore
  register(cytoscape);
}

module.exports = register;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__(579);
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});