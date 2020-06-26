import * as utils from './utils.js';
import { DEFAULT_OPTS, MENUITEM_CSS_CLASS, DIVIDER_CSS_CLASS } from './constants.js';
import { MenuItem, ContextMenu } from './context-menu.js';

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
  /** @type { ContextMenu } */
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

  /**
   * @param { MenuItem } menuItem 
   */
  let bindCyCxttap = (menuItem, selector, coreAsWell) => {
    let _cxtfcn = (event) => {
      setScratchProp('currentCyEvent', event);
      adjustCxtMenu(event); // adjust the position of context menu
      if (menuItem.show) {
        if (!utils.isElementVisible(cxtMenu)) {
          cxtMenu.display();
        }
        // anyVisibleChild indicates if there is any visible child of context menu if not do not show the context menu
        setScratchProp('anyVisibleChild', true);// there is visible child
        menuItem.display();
      }

      // If there is no visible element hide the context menu as well(If it is visible)
      if (!getScratchProp('anyVisibleChild') && utils.isElementVisible(cxtMenu)) {
        cxtMenu.hide();
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
    menuItem.data['cy-context-menus-cxtfcn'] = cxtfcn;
    menuItem.data['cy-context-menus-cxtcorefcn'] = cxtCoreFcn; 
  };

  let bindCyEvents = () => {
    let eventCyTapStart = () => {
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
  let performBindings = (menuItem, onClickFcn, selector, coreAsWell) => {
    bindOnClickFunction(menuItem, onClickFcn);
    bindCyCxttap(menuItem, selector, coreAsWell);
  };

  // Adjusts context menu if necessary
  let adjustCxtMenu = (event) => {
    const container = cy.container();
    let currentCxtMenuPosition = getScratchProp('cxtMenuPosition');
    let cyPos = event.position || event.cyPosition;

    if (currentCxtMenuPosition != cyPos) {
      cxtMenu.hideMenuItems();
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

  let createAndAppendMenuItemComponent = (opts) => {
    // Create and append menu item
    let menuItemComponent = createMenuItemComponent(opts);
    cxtMenu.appendMenuItem(menuItemComponent);

    performBindings(menuItemComponent, opts.onClickFunction, opts.selector, opts.coreAsWell);
  };//insertComponentBeforeExistingItem(component, existingItemID)

  let createAndAppendMenuItemComponents = (optionsArr) => {
    for (let i = 0; i < optionsArr.length; i++) {
      createAndAppendMenuItemComponent(optionsArr[i]);
    }
  };

  let createAndInsertMenuItemComponentBeforeExistingComponent = (opts, existingComponentID) => {
    // Create and insert menu item
    let menuItemComponent = createMenuItemComponent(opts);
    cxtMenu.insertBeforeExistingMenuItem(menuItemComponent, existingComponentID);

    performBindings(menuItemComponent, opts.onClickFunction, opts.selector, opts.coreAsWell);
  };

  // Creates a menu item as an html component
  let createMenuItemComponent = (opts) => {
    opts.className = getMenuItemClassStr(options.menuItemClasses, opts.hasTrailingDivider);
    return new MenuItem(opts);
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

  let removeAndUnbindMenuItem = (menuItemID) => {
    let menuItem = typeof menuItemID === 'string' ? document.getElementById(menuItemID) : menuItemID;
    if (menuItem instanceof MenuItem) {
      let selector = menuItem.selector;
      let cxtfcn = menuItem.data['cy-context-menus-cxtfcn'];
      let cxtCoreFcn = menuItem.data['cy-context-menus-cxtcorefcn'];
      
      if (cxtfcn) {
        cy.off(options.evtType, selector, cxtfcn);
      }
  
      if (cxtCoreFcn) {
        cy.off(options.evtType, cxtCoreFcn);
      }
  
      menuItem.unbindOnClickFunctions();
  
      cxtMenu.removeMenuItem(menuItem);
    } else {
      throw new Error(`The item with id='${menuItemID}' is not a menu item`);
    }
  };

  // this sets disabled to true
  let disableMenuItem = (menuItemID) => {
    let menuItem = document.getElementById(menuItemID);
    if (menuItem instanceof MenuItem) {
      menuItem.disable();
    } else {
      throw new Error(`There is no menu item with id=${menuItemID}`);
    }
  };

  // this sets disabled to false by removing
  let enableMenuItem = (menuItemID) => {
    let menuItem = document.getElementById(menuItemID);
    if (menuItem instanceof MenuItem) {
      menuItem.enable();
    } else {
      throw new Error(`There is no menu item with id=${menuItemID}`);
    }
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
        cxtMenu.moveBefore(itemID, existingItemID);
        return cy;
      },
      // Disables the menu item with given ID.
      disableMenuItem: function(itemID) {
        disableMenuItem(itemID);
        return cy;
      },
      // Enables the menu item with given ID.
      enableMenuItem: function(itemID) {
        enableMenuItem(itemID);
        return cy;
      },
      // Disables the menu item with given ID.
      hideMenuItem: function(itemID) {
        let menuItem = document.getElementById(itemID);
        if (menuItem instanceof MenuItem) {
          menuItem.hide();
        }
        return cy;
      },
      // Enables the menu item with given ID.
      showMenuItem: function(itemID) {
        let menuItem = document.getElementById(itemID);
        if (menuItem instanceof MenuItem) {
          menuItem.display();
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
    // https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements
    MenuItem.define();
    ContextMenu.define();

    // merge the options with default ones
    options = utils.extend(DEFAULT_OPTS, opts);
    setScratchProp('options', options);

    // Clear old context menu if needed
    if (getScratchProp('active')) {
      destroyCxtMenu();
    }

    setScratchProp('active', true);

    // Create cxtMenu and append it to body
    let classes = utils.getClassStr(options.contextMenuClasses);
    let onMenuItemClick = () => setScratchProp('cxtMenuPosition', undefined);
    cxtMenu = new ContextMenu(classes, onMenuItemClick);

    setScratchProp('cxtMenu', cxtMenu);
    document.body.appendChild(cxtMenu);

    let menuItems = options.menuItems;
    createAndAppendMenuItemComponents(menuItems);

    bindCyEvents();
    utils.preventDefaultContextTap();
  }
  
  return getInstance(this);
}