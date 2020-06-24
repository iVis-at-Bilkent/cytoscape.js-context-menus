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
}
// CONCATENATED MODULE: ./src/cytoscape-context-menus.js
function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }


function register(cytoscape) {
  if (!cytoscape) {
    return;
  } // can't register if cytoscape unspecified


  var defaults = {
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
  var eventCyTapStart; // The event to be binded on tap start
  // To initialize with options.

  cytoscape('core', 'contextMenus', function (opts) {
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
    var cxtMenu = getScratchProp('cxtMenu');
    var menuItemCSSClass = 'cy-context-menus-cxt-menuitem';
    var dividerCSSClass = 'cy-context-menus-divider'; // Merge default options with the ones coming from parameter

    var extend = function extend(defaults, options) {
      var obj = {};

      for (var i in defaults) {
        obj[i] = defaults[i];
      }

      for (var _i in options) {
        obj[_i] = options[_i];
      }

      return obj;
    };

    var preventDefaultContextTap = function preventDefaultContextTap() {
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
    }; // Get string representation of css classes


    var getMenuItemClassStr = function getMenuItemClassStr(classes, hasTrailingDivider) {
      var str = getClassStr(classes);
      str += ' ' + menuItemCSSClass;

      if (hasTrailingDivider) {
        str += ' ' + dividerCSSClass;
      }

      return str;
    }; // Get string representation of css classes


    var getClassStr = function getClassStr(classes) {
      var str = '';

      for (var i = 0; i < classes.length; i++) {
        var className = classes[i];
        str += className;

        if (i !== classes.length - 1) {
          str += ' ';
        }
      }

      return str;
    };

    var displayComponent = function displayComponent(component) {
      component.style.display = 'block';
    };

    var hideComponent = function hideComponent(component) {
      component.style.display = 'none';
    };

    var hideMenuItemComponents = function hideMenuItemComponents() {
      var items = cxtMenu.children;

      var _iterator2 = _createForOfIteratorHelper(items),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var item = _step2.value;
          item.style.display = 'none';
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
    };

    var bindOnClickFunction = function bindOnClickFunction(component, onClickFcn) {
      var callOnClickFn = function callOnClickFn() {
        onClickFcn(getScratchProp('currentCyEvent'));
      };

      component.addEventListener('click', callOnClickFn);
      component.data['call-on-click-function'] = callOnClickFn;
    };

    var bindCyCxttap = function bindCyCxttap(component, selector, coreAsWell) {
      var _cxtfcn = function _cxtfcn(event) {
        setScratchProp('currentCyEvent', event);
        adjustCxtMenu(event); // adjust the position of context menu

        if (component.data['show']) {
          if (!isElementVisible(cxtMenu)) {
            displayComponent(cxtMenu);
          } // anyVisibleChild indicates if there is any visible child of context menu if not do not show the context menu


          setScratchProp('anyVisibleChild', true); // there is visible child

          displayComponent(component); // display the component
        } // If there is no visible element hide the context menu as well(If it is visible)


        if (!getScratchProp('anyVisibleChild') && isElementVisible(cxtMenu)) {
          hideComponent(cxtMenu);
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


      component.data['cy-context-menus-cxtfcn'] = cxtfcn;
      component.data['cy-context-menus-cxtcorefcn'] = cxtCoreFcn;
    };

    var bindCyEvents = function bindCyEvents() {
      cy.on('tapstart', eventCyTapStart = function eventCyTapStart() {
        hideComponent(cxtMenu);
        setScratchProp('cxtMenuPosition', undefined);
        setScratchProp('currentCyEvent', undefined);
      });
    };

    var performBindings = function performBindings(component, onClickFcn, selector, coreAsWell) {
      bindOnClickFunction(component, onClickFcn);
      bindCyCxttap(component, selector, coreAsWell);
    }; // Adjusts context menu if necessary


    var adjustCxtMenu = function adjustCxtMenu(event) {
      var container = cy.container();
      var currentCxtMenuPosition = getScratchProp('cxtMenuPosition');
      var cyPos = event.position || event.cyPosition;

      if (currentCxtMenuPosition != cyPos) {
        hideMenuItemComponents();
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

    var createAndAppendMenuItemComponents = function createAndAppendMenuItemComponents(menuItems) {
      for (var i = 0; i < menuItems.length; i++) {
        createAndAppendMenuItemComponent(menuItems[i]);
      }
    };

    var createAndAppendMenuItemComponent = function createAndAppendMenuItemComponent(menuItem) {
      // Create and append menu item
      var menuItemComponent = createMenuItemComponent(menuItem);
      appendComponentToCxtMenu(menuItemComponent);
      performBindings(menuItemComponent, menuItem.onClickFunction, menuItem.selector, menuItem.coreAsWell);
    }; //insertComponentBeforeExistingItem(component, existingItemID)


    var createAndInsertMenuItemComponentBeforeExistingComponent = function createAndInsertMenuItemComponentBeforeExistingComponent(menuItem, existingComponentID) {
      // Create and insert menu item
      var menuItemComponent = createMenuItemComponent(menuItem);
      insertComponentBeforeExistingItem(menuItemComponent, existingComponentID);
      performBindings(menuItemComponent, menuItem.onClickFunction, menuItem.selector, menuItem.coreAsWell);
    }; // create cxtMenu and append it to body


    var createAndAppendCxtMenuComponent = function createAndAppendCxtMenuComponent() {
      var cxtMenu = document.createElement('div');
      var classes = getClassStr(options.contextMenuClasses);
      cxtMenu.setAttribute('class', classes);
      cxtMenu.style.position = 'absolute'; // So that left, right, etc. css attributes would work

      cxtMenu.classList.add('cy-context-menus-cxt-menu');
      setScratchProp('cxtMenu', cxtMenu);
      document.body.appendChild(cxtMenu);
      return cxtMenu;
    }; // Creates a menu item as an html component


    var createMenuItemComponent = function createMenuItemComponent(item) {
      var classStr = getMenuItemClassStr(options.menuItemClasses, item.hasTrailingDivider);
      var itemEl = document.createElement('button');
      itemEl.setAttribute('id', item.id);
      itemEl.setAttribute('class', classStr);

      if (item.tooltipText) {
        itemEl.setAttribute('title', item.tooltipText);
      }

      if (item.disabled) {
        itemEl.setAttribute('disabled', 'true');
      }

      if (item.image) {
        var img = document.createElement('img');
        img.src = item.image.src;
        img.width = item.image.width;
        img.height = item.image.height;
        img.style.position = 'absolute';
        img.style.top = item.image.y + 'px';
        img.style.left = item.image.x + 'px';
        itemEl.appendChild(img);
      }

      itemEl.innerHTML += item.content;
      itemEl['data'] = {
        selector: item.selector,
        'on-click-function': item.onClickFunction,
        show: item.show || true
      };
      return itemEl;
    }; // Appends the given component to cxtMenu


    var appendComponentToCxtMenu = function appendComponentToCxtMenu(component) {
      cxtMenu.appendChild(component);
      bindMenuItemClickFunction(component);
    }; // Insert the given component to cxtMenu just before the existing item with given ID


    var insertComponentBeforeExistingItem = function insertComponentBeforeExistingItem(component, existingItemID) {
      var existingItem = document.getElementById(existingItemID);
      existingItem.parentNode.insertBefore(component, existingItem);
    };

    var destroyCxtMenu = function destroyCxtMenu() {
      if (!getScratchProp('active')) {
        return;
      }

      removeAndUnbindMenuItems();
      cy.off('tapstart', eventCyTapStart);
      cxtMenu.parentNode.removeChild(cxtMenu);
      cxtMenu = undefined;
      setScratchProp(cxtMenu, undefined);
      setScratchProp('active', false);
      setScratchProp('anyVisibleChild', false);
    };

    var removeAndUnbindMenuItems = function removeAndUnbindMenuItems() {
      var _iterator3 = _createForOfIteratorHelper(cxtMenu.children),
          _step3;

      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var child = _step3.value;
          removeAndUnbindMenuItem(child.getAttribute('id'));
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }
    };

    var removeAndUnbindMenuItem = function removeAndUnbindMenuItem(itemID) {
      var component = typeof itemID === 'string' ? document.getElementById(itemID) : itemID;
      var cxtfcn = component.data['cy-context-menus-cxtfcn'];
      var selector = component.data['selector'];
      var callOnClickFcn = component.data['call-on-click-function'];
      var hideCxtMenuFn = component.data['hide-cxt-menu-fn'];
      var cxtCoreFcn = component.data['cy-context-menus-cxtcorefcn'];

      if (cxtfcn) {
        cy.off(options.evtType, selector, cxtfcn);
      }

      if (cxtCoreFcn) {
        cy.off(options.evtType, cxtCoreFcn);
      }

      if (callOnClickFcn) {
        component.removeEventListener('click', callOnClickFcn);
        component.removeEventListener('click', hideCxtMenuFn);
      }

      component.parentNode.removeChild(component);
    };

    var moveBeforeOtherMenuItemComponent = function moveBeforeOtherMenuItemComponent(componentID, existingComponentID) {
      if (componentID === existingComponentID) {
        return;
      }

      var component = document.getElementById(componentID);
      component.parentNode.removeChild(component);
      var existingComponent = document.getElementById(existingComponentID);
      existingComponent.parentNode.insertBefore(component, existingComponent);
    };

    var bindMenuItemClickFunction = function bindMenuItemClickFunction(component) {
      var hideCxtMenu = function hideCxtMenu() {
        hideComponent(cxtMenu);
        setScratchProp('cxtMenuPosition', undefined);
      };

      component.data['hide-cxt-menu-fn'] = hideCxtMenu;
      component.addEventListener('click', hideCxtMenu);
    }; // this sets disabled to true


    var disableComponent = function disableComponent(componentID) {
      document.getElementById(componentID) // https://stackoverflow.com/a/38057647/12045421
      .setAttribute('disabled', '');
    }; // this sets disabled to false by removing


    var enableComponent = function enableComponent(componentID) {
      document.getElementById(componentID) // https://stackoverflow.com/a/38057647/12045421
      .removeAttribute('disabled');
    };

    var _setTrailingDivider = function setTrailingDivider(componentID, status) {
      var component = document.getElementById(componentID);

      if (status) {
        component.classList.add(dividerCSSClass);
      } else {
        component.classList.remove(dividerCSSClass);
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
          moveBeforeOtherMenuItemComponent(itemID, existingItemID);
          return cy;
        },
        // Disables the menu item with given ID.
        disableMenuItem: function disableMenuItem(itemID) {
          disableComponent(itemID);
          return cy;
        },
        // Enables the menu item with given ID.
        enableMenuItem: function enableMenuItem(itemID) {
          enableComponent(itemID);
          return cy;
        },
        // Disables the menu item with given ID.
        hideMenuItem: function hideMenuItem(itemID) {
          var item = document.getElementById(itemID);

          if (item) {
            item['data']['show'] = false;
            hideComponent(item);
          }

          return cy;
        },
        // Enables the menu item with given ID.
        showMenuItem: function showMenuItem(itemID) {
          var item = document.getElementById(itemID);

          if (item) {
            item['data']['show'] = true;
            displayComponent(item);
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
      // merge the options with default ones
      options = extend(defaults, opts);
      setScratchProp('options', options); // Clear old context menu if needed

      if (getScratchProp('active')) {
        destroyCxtMenu();
      }

      setScratchProp('active', true);
      cxtMenu = createAndAppendCxtMenuComponent();
      var menuItems = options.menuItems;
      createAndAppendMenuItemComponents(menuItems);
      bindCyEvents();
      preventDefaultContextTap();
    }

    return getInstance(this);
  });
} // @ts-ignore

if (typeof cytoscape !== 'undefined') {
  // Register for plain javascript
  // @ts-ignore
  register(cytoscape);
}

/***/ })
/******/ ]);
});