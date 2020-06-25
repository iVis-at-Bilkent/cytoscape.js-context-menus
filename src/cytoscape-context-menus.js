import * as utils from './utils.js';
import { DEFAULT_OPTS, MENUITEM_CSS_CLASS, DIVIDER_CSS_CLASS } from './constants.js';
import { MenuItem } from './context-menu.js';

export function contextMenus(opts) {
  let cy = this;
  
  // Initilize scratch pad
  if (!cy.scratch('cycontextmenus')) {
    cy.scratch('cycontextmenus', {});
  }

  let getScratchProp = (propname) => 
    cy.scratch('cycontextmenus')[propname];

  let setScratchProp = (propname, value) => 
    cy.scratch('cycontextmenus')[propname] = value;
  
  let options = getScratchProp('options');
  let cxtMenu = getScratchProp('cxtMenu');

  // Get string representation of css classes
  let getMenuItemClassStr = (classes, hasTrailingDivider) => {
    let str = utils.getClassStr(classes);

    str += ' ' + MENUITEM_CSS_CLASS;

    if (hasTrailingDivider) {
      str += ' ' + DIVIDER_CSS_CLASS;
    }

    return str;
  };

  let displayComponent = (component) => {
    component.style.display = 'block';
  };

  let hideComponent = (component) => {
    component.style.display = 'none';
  };

  let hideMenuItemComponents = () => {
    let items = cxtMenu.children;
    for (let item of items) {
      item.style.display = 'none';
    }
  };

  /**
   * 
   * @param { MenuItem } component 
   * @param {*} onClickFcn 
   */
  let bindOnClickFunction = (component, onClickFcn) => {        
    let callOnClickFn = () => { 
      onClickFcn(getScratchProp('currentCyEvent')); 
    };
    
    component.bindOnClickFunction(callOnClickFn);
  }

  let bindCyCxttap = (component, selector, coreAsWell) => {
    let _cxtfcn = (event) => {
      setScratchProp('currentCyEvent', event);
      adjustCxtMenu(event); // adjust the position of context menu
      if (component.show) {
        if (!utils.isElementVisible(cxtMenu)) {
          displayComponent(cxtMenu);
        }
        // anyVisibleChild indicates if there is any visible child of context menu if not do not show the context menu
        setScratchProp('anyVisibleChild', true);// there is visible child
        displayComponent(component); // display the component
      }

      // If there is no visible element hide the context menu as well(If it is visible)
      if (!getScratchProp('anyVisibleChild') && utils.isElementVisible(cxtMenu)) {
        hideComponent(cxtMenu);
      }
    };

    let cxtfcn;
    let cxtCoreFcn;
    if (coreAsWell) {
      cy.on(options.evtType, cxtCoreFcn = (event) => {
        let target = event.target || event.cyTarget;
        if (target != cy) {
          return;
        }

        _cxtfcn(event);
      });
    }

    if (selector) {
      cy.on(options.evtType, selector, cxtfcn = (event) => {
        _cxtfcn(event);
      });
    }

    // Bind the event to menu item to be able to remove it back
    component.data['cy-context-menus-cxtfcn'] = cxtfcn;
    component.data['cy-context-menus-cxtcorefcn'] = cxtCoreFcn; 
  };

  let bindCyEvents = () => {
    let eventCyTapStart = () => {
      hideComponent(cxtMenu);
      setScratchProp('cxtMenuPosition', undefined);
      setScratchProp('currentCyEvent', undefined);
    };
    
    setScratchProp('eventCyTapStart', eventCyTapStart);
    cy.on('tapstart', eventCyTapStart);
  };

  let performBindings = (component, onClickFcn, selector, coreAsWell) => {
    bindOnClickFunction(component, onClickFcn);
    bindCyCxttap(component, selector, coreAsWell);
  };

  // Adjusts context menu if necessary
  let adjustCxtMenu = (event) => {
    const container = cy.container();
    let currentCxtMenuPosition = getScratchProp('cxtMenuPosition');
    let cyPos = event.position || event.cyPosition;

    if (currentCxtMenuPosition != cyPos) {
      hideMenuItemComponents();
      setScratchProp('anyVisibleChild', false);// we hide all children there is no visible child remaining
      setScratchProp('cxtMenuPosition', cyPos);
      
      let containerPos = utils.getOffset(container);
      let renderedPos = event.renderedPosition || event.cyRenderedPosition;

      let borderWidth = getComputedStyle(container)['border-width'];
      let borderThickness = parseInt(borderWidth.replace("px","")) || 0;
      if (borderThickness > 0) {
        containerPos.top += borderThickness;
        containerPos.left += borderThickness;
      }
      let containerHeight = container.clientHeight;
      let containerWidth = container.clientWidth; 

      let horizontalSplit = containerHeight / 2;
      let verticalSplit = containerWidth / 2;    
      let windowHeight = window.innerHeight;
      let windowWidth = window.innerWidth;        
                
      //When user clicks on bottom-left part of window
      if (renderedPos.y > horizontalSplit && renderedPos.x <= verticalSplit) {
        cxtMenu.style.left = (renderedPos.x + containerPos.left) + 'px';
        cxtMenu.style.bottom = (windowHeight - (containerPos.top + renderedPos.y)) + 'px';
        cxtMenu.style.right = "auto";
        cxtMenu.style.top = "auto";
      } else if (renderedPos.y > horizontalSplit && renderedPos.x > verticalSplit) {
        cxtMenu.style.right = (windowWidth - (containerPos.left+ renderedPos.x)) + 'px';
        cxtMenu.style.bottom = (windowHeight - (containerPos.top + renderedPos.y)) + 'px';
        cxtMenu.style.left = "auto";
        cxtMenu.style.top = "auto";
      } else if (renderedPos.y <= horizontalSplit && renderedPos.x <= verticalSplit) {
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
  };

  let createAndAppendMenuItemComponent = (options) => {
    // Create and append menu item
    let menuItemComponent = createMenuItemComponent(options);
    appendComponentToCxtMenu(menuItemComponent);

    performBindings(menuItemComponent, options.onClickFunction, options.selector, options.coreAsWell);
  };//insertComponentBeforeExistingItem(component, existingItemID)

  let createAndAppendMenuItemComponents = (optionsArr) => {
    for (let i = 0; i < optionsArr.length; i++) {
      createAndAppendMenuItemComponent(optionsArr[i]);
    }
  };

  let createAndInsertMenuItemComponentBeforeExistingComponent = (options, existingComponentID) => {
    // Create and insert menu item
    let menuItemComponent = createMenuItemComponent(options);
    insertComponentBeforeExistingItem(menuItemComponent, existingComponentID);

    performBindings(menuItemComponent, options.onClickFunction, options.selector, options.coreAsWell);
  };

  // create cxtMenu and append it to body
  let createAndAppendCxtMenuComponent = () => {
    let cxtMenu = document.createElement('div');
    let classes = utils.getClassStr(options.contextMenuClasses);

    cxtMenu.setAttribute('class', classes);
    cxtMenu.style.position = 'absolute'; // So that left, right, etc. css attributes would work
    cxtMenu.classList.add('cy-context-menus-cxt-menu');
    setScratchProp('cxtMenu', cxtMenu);

    document.body.appendChild(cxtMenu);
    return cxtMenu;
  };

  // Creates a menu item as an html component
  let createMenuItemComponent = (opts) => {
    opts.className = getMenuItemClassStr(options.menuItemClasses, opts.hasTrailingDivider);
    return new MenuItem(opts);
  };

  // Appends the given component to cxtMenu
  let appendComponentToCxtMenu = (component) => {
    cxtMenu.appendChild(component);
    bindMenuItemClickFunction(component);
  };

  // Insert the given component to cxtMenu just before the existing item with given ID
  let insertComponentBeforeExistingItem = (component, existingItemID) => {
    let existingItem = document.getElementById(existingItemID);
    existingItem.parentNode.insertBefore(component, existingItem);
  };

  let destroyCxtMenu = () => {
    if(!getScratchProp('active')) {
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

  let removeAndUnbindMenuItems = () => {
    for (let child of cxtMenu.children) {
      removeAndUnbindMenuItem(child.getAttribute('id'));
    }        
  };

  let removeAndUnbindMenuItem = (itemID) => {
    let component = typeof itemID === 'string' ? document.getElementById(itemID) : itemID;
    let selector = component.selector;
    let cxtfcn = component.data['cy-context-menus-cxtfcn'];
    let cxtCoreFcn = component.data['cy-context-menus-cxtcorefcn'];
    
    if (cxtfcn) {
      cy.off(options.evtType, selector, cxtfcn);
    }

    if (cxtCoreFcn) {
      cy.off(options.evtType, cxtCoreFcn);
    }

    component.unbindOnClickFunctions();

    component.parentNode.removeChild(component);
  };

  let moveBeforeOtherMenuItemComponent = (componentID, existingComponentID) => {
    if (componentID === existingComponentID) {
      return;
    }

    let component = document.getElementById(componentID);
    component.parentNode.removeChild(component);
    let existingComponent = document.getElementById(existingComponentID);

    existingComponent.parentNode.insertBefore(component, existingComponent);
  };

  /**
   * @param {MenuItem} component 
   */
  let bindMenuItemClickFunction = (component) => {
    let hideCxtMenu = () => {
      hideComponent(cxtMenu);
      setScratchProp('cxtMenuPosition', undefined);
    };
    component.bindOnClickFunction(hideCxtMenu);
  };

  // this sets disabled to true
  let disableComponent = (componentID) => {
    let elem = document.getElementById(componentID);
    utils.setBooleanAttribute(elem, 'disabled', true);
  };

  // this sets disabled to false by removing
  let enableComponent = (componentID) => {
    let elem = document.getElementById(componentID);
    utils.setBooleanAttribute(elem, 'disabled', false);
  };

  let setTrailingDivider = (componentID, status) => {
    let component = document.getElementById(componentID);

    if (status) {
      component.classList.add(DIVIDER_CSS_CLASS);
    } else {
      component.classList.remove(DIVIDER_CSS_CLASS);
    }
  };

  // Get an extension instance to enable users to access extension methods
  let getInstance = (cy) => {
    let instance = {
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
        let menuItem = document.getElementById(itemID);
        if (menuItem) {
          // @ts-ignore
          menuItem.show = false;
          hideComponent(menuItem);
        }
        return cy;
      },
      // Enables the menu item with given ID.
      showMenuItem: function(itemID) {
        let menuItem = document.getElementById(itemID);
        if (menuItem) {
          // @ts-ignore
          menuItem.show = true;
          displayComponent(menuItem);
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
  };

  if ( opts !== 'get' ) {
    // Not mandatory since we always create components dynamically
    MenuItem.define();

    // merge the options with default ones
    options = utils.extend(DEFAULT_OPTS, opts);
    setScratchProp('options', options);

    // Clear old context menu if needed
    if (getScratchProp('active')) {
      destroyCxtMenu();
    }

    setScratchProp('active', true);

    cxtMenu = createAndAppendCxtMenuComponent();

    let menuItems = options.menuItems;
    createAndAppendMenuItemComponents(menuItems);

    bindCyEvents();
    utils.preventDefaultContextTap();
  }
  
  return getInstance(this);
}