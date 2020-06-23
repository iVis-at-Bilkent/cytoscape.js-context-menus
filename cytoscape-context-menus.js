;(function(){ 'use strict';

  // Utility functions that are not directly related with the extension
  const utils = {
    getOffset(el) {
        let rect = el.getBoundingClientRect();
    
        return {
            top: rect.top,
            left: rect.left, 
        };
    },
    // http://youmightnotneedjquery.com/
    matches(el, selector) {
        return (el.matches || 
            el.matchesSelector || 
            el.msMatchesSelector || 
            el.mozMatchesSelector || 
            el.webkitMatchesSelector || 
            el.oMatchesSelector).call(el, selector);
    },
    // based on jQuery.expr.filters.hidden in http://code.jquery.com/jquery-latest.js
    isElementHidden(elem) {
        return elem.offsetWidth <= 0 && elem.offsetHeight <= 0 ||
            ((elem.style && elem.style.display) || getComputedStyle(elem)['display']);
    },
    isElementVisible(elem) {
        return !this.isElementHidden(elem);
    }
  };

  var register = function(cytoscape) {
    
    if (!cytoscape) { 
      console.error('cytoscape is not found');
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
      menuItemClasses: [
        // add class names to this list
      ],
      // css classes that context menu will have
      contextMenuClasses: [
        // add class names to this list
      ]
    };
    
    var eventCyTapStart; // The event to be binded on tap start
    
    // To initialize with options.
    cytoscape('core', 'contextMenus', function (opts) {
      var cy = this;
      
      // Initilize scratch pad
      if (!cy.scratch('cycontextmenus')) {
        cy.scratch('cycontextmenus', {});
      }
      
      var options = getScratchProp('options');
      var cxtMenu = getScratchProp('cxtMenu');
      var menuItemCSSClass = 'cy-context-menus-cxt-menuitem';
      var dividerCSSClass = 'cy-context-menus-divider';
      
      // Merge default options with the ones coming from parameter
      function extend(defaults, options) {
        var obj = {};

        for (var i in defaults) {
          obj[i] = defaults[i];
        }

        for (var i in options) {
          obj[i] = options[i];
        }

        return obj;
      };

      function getScratchProp(propname) {
        return cy.scratch('cycontextmenus')[propname];
      };
      
      function setScratchProp(propname, value) {
        cy.scratch('cycontextmenus')[propname] = value;
      };

      function preventDefaultContextTap() {
        /* $(".cy-context-menus-cxt-menu").contextmenu( function() {
            return false;
        }); */
        let contextMenuAreas = document.getElementsByClassName('cy-context-menus-cxt-menu');

        for (const cxtMenuArea of contextMenuAreas) {
          cxtMenuArea.addEventListener('contextmenu', e => e.preventDefault());
        }
      }

      // Get string representation of css classes
      function getMenuItemClassStr(classes, hasTrailingDivider) {
        var str = getClassStr(classes);

        str += ' ' + menuItemCSSClass;

        if(hasTrailingDivider) {
          str += ' ' + dividerCSSClass;
        }

        return str;
      }

      // Get string representation of css classes
      function getClassStr(classes) {
        var str = '';

        for( var i = 0; i < classes.length; i++ ) {
          var className = classes[i];
          str += className;
          if(i !== classes.length - 1) {
            str += ' ';
          }
        }

        return str;
      }

      function displayComponent(component) {
        component.style.display = 'block';
      }

      function hideComponent(component) {
        component.style.display = 'none';
      }

      function hideMenuItemComponents() {
        let items = cxtMenu.children;
        for (let item of items) {
          item.style.display = 'none';
        }
      }

      function bindOnClickFunction($component, onClickFcn) {        
        let callOnClickFn = () => { onClickFcn(getScratchProp('currentCyEvent')); };
        $component.addEventListener('click', callOnClickFn);

        $component.data['call-on-click-function'] = callOnClickFn;
      }

      function bindCyCxttap($component, selector, coreAsWell) {
        function _cxtfcn(event) {
          setScratchProp('currentCyEvent', event);
          adjustCxtMenu(event); // adjust the position of context menu
          if ($component.data['show']) {
            if (!utils.isElementVisible(cxtMenu)) {
              displayComponent(cxtMenu);
            }
            // anyVisibleChild indicates if there is any visible child of context menu if not do not show the context menu
            setScratchProp('anyVisibleChild', true);// there is visible child
            displayComponent($component); // display the component
          }

          // If there is no visible element hide the context menu as well(If it is visible)
          if (!getScratchProp('anyVisibleChild') && utils.isElementVisible(cxtMenu)) {
            hideComponent(cxtMenu);
          }
        }

        var cxtfcn;
        var cxtCoreFcn;
        if (coreAsWell) {
          cy.on(options.evtType, cxtCoreFcn = function(event) {
            var target = event.target || event.cyTarget;
            if (target != cy) {
              return;
            }

            _cxtfcn(event);
          });
        }

        if (selector) {
          cy.on(options.evtType, selector, cxtfcn = function(event) {
            _cxtfcn(event);
          });
        }

        // Bind the event to menu item to be able to remove it back
        $component.data['cy-context-menus-cxtfcn'] = cxtfcn;
        $component.data['cy-context-menus-cxtcorefcn'] = cxtCoreFcn; 
      }

      function bindCyEvents() {
        cy.on('tapstart', eventCyTapStart = function() {
          hideComponent(cxtMenu);
          setScratchProp('cxtMenuPosition', undefined);
          setScratchProp('currentCyEvent', undefined);
        });
      }

      function performBindings(component, onClickFcn, selector, coreAsWell) {
        bindOnClickFunction(component, onClickFcn);
        bindCyCxttap(component, selector, coreAsWell);
      }

      // Adjusts context menu if necessary
      function adjustCxtMenu(event) {
        const container = cy.container();
        var currentCxtMenuPosition = getScratchProp('cxtMenuPosition');
        var cyPos = event.position || event.cyPosition;

        if (currentCxtMenuPosition != cyPos) {
          hideMenuItemComponents();
          setScratchProp('anyVisibleChild', false);// we hide all children there is no visible child remaining
          setScratchProp('cxtMenuPosition', cyPos);
          
          var containerPos = utils.getOffset(container);
          var renderedPos = event.renderedPosition || event.cyRenderedPosition;

          let borderWidth = getComputedStyle(container)['border-width'];
          var borderThickness = parseInt(borderWidth.replace("px","")) || 0;
          if (borderThickness > 0) {
            containerPos.top += borderThickness;
            containerPos.left += borderThickness;
          }
          let containerHeight = container.clientHeight;
          let containerWidth = container.clientWidth; 

          var horizontalSplit = containerHeight / 2;
          var verticalSplit = containerWidth / 2;    
          let windowHeight = window.innerHeight;
          let windowWidth = window.innerWidth;        
                    
          //When user clicks on bottom-left part of window
          if(renderedPos.y > horizontalSplit && renderedPos.x <= verticalSplit) {
            cxtMenu.style.left = (renderedPos.x + containerPos.left) + 'px';
            cxtMenu.style.bottom = (windowHeight - (containerPos.top + renderedPos.y)) + 'px';
            cxtMenu.style.right = "auto";
            cxtMenu.style.top = "auto";
          } else if(renderedPos.y > horizontalSplit && renderedPos.x > verticalSplit) {
            cxtMenu.style.right = (windowWidth - (containerPos.left+ renderedPos.x)) + 'px';
            cxtMenu.style.bottom = (windowHeight - (containerPos.top + renderedPos.y)) + 'px';
            cxtMenu.style.left = "auto";
            cxtMenu.style.top = "auto";
          } else if(renderedPos.y <= horizontalSplit && renderedPos.x <= verticalSplit) {
            cxtMenu.style.left = (renderedPos.x + containerPos.left) + 'px';
            cxtMenu.style.top = (renderedPos.y + containerPos.top) + 'px';
            cxtMenu.style.right = "auto";
            cxtMenu.style.bottom = "auto";
          } else {            
            cxtMenu.style.right = (windowWidth - (renderedPos.x + containerPos.left)) + 'px';
            cxtMenu.style.top = (renderedPos.y + containerPos.top) + 'px';
            cxtMenu.style.left = "auto";
            cxtMenu.style.bottom = "auto";
          }
        }
      }

      function createAndAppendMenuItemComponents(menuItems) {
        for (let i = 0; i < menuItems.length; i++) {
          createAndAppendMenuItemComponent(menuItems[i]);
        }
      }

      function createAndAppendMenuItemComponent(menuItem) {
        // Create and append menu item
        let menuItemComponent = createMenuItemComponent(menuItem);
        appendComponentToCxtMenu(menuItemComponent);

        performBindings(menuItemComponent, menuItem.onClickFunction, menuItem.selector, menuItem.coreAsWell);
      }//insertComponentBeforeExistingItem(component, existingItemID)

      function createAndInsertMenuItemComponentBeforeExistingComponent(menuItem, existingComponentID) {
        // Create and insert menu item
        let menuItemComponent = createMenuItemComponent(menuItem);
        insertComponentBeforeExistingItem(menuItemComponent, existingComponentID);

        performBindings(menuItemComponent, menuItem.onClickFunction, menuItem.selector, menuItem.coreAsWell);
      }

      // create cxtMenu and append it to body
      function createAndAppendCxtMenuComponent() {
        let cxtMenu = document.createElement('div');
        let classes = getClassStr(options.contextMenuClasses);
        cxtMenu.setAttribute('class', classes);
        cxtMenu.style.position = 'absolute'; // So that left, right, etc. would work
        cxtMenu.classList.add('cy-context-menus-cxt-menu');
        setScratchProp('cxtMenu', cxtMenu);

        document.body.appendChild(cxtMenu);
        return cxtMenu;
      }

      // Creates a menu item as an html component
      function createMenuItemComponent(item) {
        let classStr = getMenuItemClassStr(options.menuItemClasses, item.hasTrailingDivider);
        let itemEl = document.createElement('button');
        itemEl.setAttribute('id', item.id);
        itemEl.setAttribute('class', classStr);

        if (item.tooltipText) {
          itemEl.setAttribute('title', item.tooltipText);
        }

        if (item.disabled) {
          itemEl.setAttribute('disabled', 'true');
        }

        if (item.image) {
          let img = document.createElement('img');
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
          show: item.show || true,
        };

        return itemEl;
      }

      // Appends the given component to cxtMenu
      function appendComponentToCxtMenu(component) {
        cxtMenu.appendChild(component);
        bindMenuItemClickFunction(component);
      }

      // Insert the given component to cxtMenu just before the existing item with given ID
      function insertComponentBeforeExistingItem(component, existingItemID) {
        let existingItem = document.getElementById(existingItemID);
        existingItem.parentNode.insertBefore(component, existingItem);
      }

      function destroyCxtMenu() {
        if(!getScratchProp('active')) {
          return;
        }

        removeAndUnbindMenuItems();

        cy.off('tapstart', eventCyTapStart);

        cxtMenu.parentNode.removeChild(cxtMenu);
        cxtMenu = undefined;
        setScratchProp(cxtMenu, undefined);
        setScratchProp('active', false);
        setScratchProp('anyVisibleChild', false);
      }

      function removeAndUnbindMenuItems() {
        for (let child of cxtMenu.children) {
          removeAndUnbindMenuItem(child.getAttribute('id'));
        }        
      }

      function removeAndUnbindMenuItem(itemID) {
        let component = typeof itemID === 'string' ? document.getElementById(itemID) : itemID;
        let cxtfcn = component.data['cy-context-menus-cxtfcn'];
        let selector = component.data['selector'];
        let callOnClickFcn = component.data['call-on-click-function'];
        let hideCxtMenuFn = component.data['hide-cxt-menu-fn'];
        let cxtCoreFcn = component.data['cy-context-menus-cxtcorefcn'];
       
        if (cxtfcn) {
          cy.off(options.evtType, selector, cxtfcn);
        }

        if (cxtCoreFcn) {
          cy.off(options.evtType, cxtCoreFcn);
        }

        if(callOnClickFcn) {
          component.removeEventListener('click', callOnClickFcn);
          component.removeEventListener('click', hideCxtMenuFn);
        }

        component.parentNode.removeChild(component);
      }

      function moveBeforeOtherMenuItemComponent(componentID, existingComponentID) {
        if (componentID === existingComponentID) {
          return;
        }

        let component = document.getElementById(componentID);
        component.parentNode.removeChild(component);
        let existingComponent = document.getElementById(existingComponentID);

        existingComponent.parentNode.insertBefore(component, existingComponent);
      }

      function bindMenuItemClickFunction(component) {
        let hideCxtMenu = () => {
          hideComponent(cxtMenu);
          setScratchProp('cxtMenuPosition', undefined);
        };
        component.data['hide-cxt-menu-fn'] = hideCxtMenu;

        component.addEventListener('click', hideCxtMenu); 
      }

      // this sets disabled to true
      function disableComponent(componentID) {
        document.getElementById(componentID)
          // https://stackoverflow.com/a/38057647/12045421
          .setAttribute('disabled', '');
      }

      // this sets disabled to false by removing
      function enableComponent(componentID) {
        document.getElementById(componentID)
          // https://stackoverflow.com/a/38057647/12045421
          .removeAttribute('disabled');
      }

      function setTrailingDivider(componentID, status) {
        let component = document.getElementById(componentID);

        if (status) {
          component.classList.add(dividerCSSClass);
        } else {
          component.classList.remove(dividerCSSClass);
        }
      }

      // Get an extension instance to enable users to access extension methods
      function getInstance(cy) {
        var instance = {
          // Returns whether the extension is active
         isActive: function() {
           return getScratchProp('active');
         },
         // Appends given menu item to the menu items list.
         appendMenuItem: function(item) {
           createAndAppendMenuItemComponent(item);
           return cy;
         },
         // Appends menu items in the given list to the menu items list.
         appendMenuItems: function(items) {
           createAndAppendMenuItemComponents(items);
           return cy;
         },
         // Removes the menu item with given ID.
         removeMenuItem: function(itemID) {
           removeAndUnbindMenuItem(itemID);
           return cy;
         },
         // Sets whether the menuItem with given ID will have a following divider.
         setTrailingDivider: function(itemID, status) {
           setTrailingDivider(itemID, status);
           return cy;
         },
         // Inserts given item before the existingitem.
         insertBeforeMenuItem: function(item, existingItemID) {
           createAndInsertMenuItemComponentBeforeExistingComponent(item, existingItemID);
           return cy;
         },
         // Moves the item with given ID before the existingitem.
         moveBeforeOtherMenuItem: function(itemID, existingItemID) {
           moveBeforeOtherMenuItemComponent(itemID, existingItemID);
           return cy;
         },
         // Disables the menu item with given ID.
         disableMenuItem: function(itemID) {
           disableComponent(itemID);
           return cy;
         },
         // Enables the menu item with given ID.
         enableMenuItem: function(itemID) {
           enableComponent(itemID);
           return cy;
         },
         // Disables the menu item with given ID.
         hideMenuItem: function(itemID) {
           let item = document.getElementById(itemID);
           if (item) {
             item['data']['show'] = false;
             hideComponent(item);
           }
           return cy;
         },
         // Enables the menu item with given ID.
         showMenuItem: function(itemID) {
           let item = document.getElementById(itemID);
           if (item) {
             item['data']['show'] = true;
             displayComponent(item);
           }
           return cy;
         },
         // Destroys the extension instance
         destroy: function() {
           destroyCxtMenu();
           return cy;
         }
        };

        return instance;
      }

      if ( opts !== 'get' ) {
        // merge the options with default ones
        options = extend(defaults, opts);
        setScratchProp('options', options);

        // Clear old context menu if needed
        if(getScratchProp('active')) {
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
  };

  if (typeof module !== 'undefined' && module.exports) { // expose as a commonjs module
    module.exports = register;
  }

  // @ts-ignore
  if (typeof define !== 'undefined' && define.amd) { // expose as an amd/requirejs module
    // @ts-ignore
    define('cytoscape-context-menus', function() {
      return register;
    });
  }

  // @ts-ignore
  if (typeof cytoscape !== 'undefined') {
    // @ts-ignore
    register(cytoscape);
  }
})();
