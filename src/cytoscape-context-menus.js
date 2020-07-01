import * as utils from './utils.js';
import { DEFAULT_OPTS, DIVIDER_CSS_CLASS, INDICATOR_CSS_CLASS } from './constants.js';
import { MenuItem, ContextMenu, MenuItemList } from './context-menu.js';

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

  /**
   * Right click event
   */
  let bindOnCxttap = () => {

    // TODO: move this to ContextMenu, just do the binding here
    let onCxttap = (event) => {
      setScratchProp('currentCyEvent', event);
      adjustCxtMenu(event); // adjust the position of context menu
      
      let target = event.target || event.cyTarget;

      // Check for each menuItem, if show is true, show the menuItem
      for (let menuItem of cxtMenu.children) {
          if (menuItem instanceof MenuItem) {
              let shouldDisplay = (target === cy) ? 
                  // If user clicked in cy area then show core items
                  menuItem.coreAsWell :
                  // If selector of the item matches then show
                  target.is(menuItem.selector);
              // User clicked on empty area and menuItem is core
              if (shouldDisplay && menuItem.show) {
                cxtMenu.display();

                // anyVisibleChild indicates if there is any visible child of context menu if not do not show the context menu
                setScratchProp('anyVisibleChild', true); // there is visible child
                menuItem.display();
              }
          }
      }

      if (!getScratchProp('anyVisibleChild') && utils.isElementVisible(cxtMenu)) {
        cxtMenu.hide();
      }
    };

    cy.on(options.evtType, onCxttap);
    setScratchProp('onCxttap', onCxttap);
  };

  let bindCyEvents = () => {

    let eventCyTapStart = () => {
      cxtMenu.hide();
      setScratchProp('cxtMenuPosition', undefined);
      setScratchProp('currentCyEvent', undefined);
    };
    
    cy.on('tapstart', eventCyTapStart);
    setScratchProp('eventCyTapStart', eventCyTapStart);
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

  let createAndAppendMenuItemComponent = (opts, parentID = undefined) => {
    // Create and append menu item
    let menuItemComponent = createMenuItemComponent(opts);

    if (typeof parentID !== 'undefined') {
      let parent = document.getElementById(parentID);

      if (parent instanceof MenuItem) {
        cxtMenu.insertMenuItem(menuItemComponent, { parent });
      } else {
        throw new Error(`item with id=${parentID} is not a menu item`)
      }
    } else {
      cxtMenu.insertMenuItem(menuItemComponent);
    }    
  };//insertComponentBeforeExistingItem(component, existingItemID)

  let createAndAppendMenuItemComponents = (optionsArr, parentID = undefined) => {
    for (let i = 0; i < optionsArr.length; i++) {
      createAndAppendMenuItemComponent(optionsArr[i], parentID);
    }
  };

  let createAndInsertMenuItemComponentBeforeExistingComponent = (opts, existingItemID) => {
    // Create and insert menu item
    let menuItemComponent = createMenuItemComponent(opts);
    let existingItem = document.getElementById(existingItemID);
    if (existingItem instanceof MenuItem) {
      cxtMenu.insertMenuItem(menuItemComponent, { before: existingItem });
    } else {
      throw new Error(`The item with id=${existingItemID} is not a menu item`);
    }
  };

  // Creates a menu item as an html component
  let createMenuItemComponent = (opts) => {
    let scratchpad = cy.scratch('cycontextmenus');
    return new MenuItem(opts, cxtMenu.onMenuItemClick, scratchpad);
  };

  let destroyCxtMenu = () => {
    if(!getScratchProp('active')) {
      return;
    }

    cxtMenu.removeAllMenuItems();

    cy.off('tapstart', getScratchProp('eventCyTapStart'));
    cy.off(options.evtType, getScratchProp('onCxttap'));

    cxtMenu.parentNode.removeChild(cxtMenu);
    cxtMenu = undefined;
    setScratchProp('cxtMenu', undefined);
    setScratchProp('active', false);
    setScratchProp('anyVisibleChild', false);
    setScratchProp('onCxttap', undefined);
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

  let makeSubmenuIndicator = (props) => {
    let elem = document.createElement('img');
    elem.src = props.src;
    elem.width = props.width;
    elem.height = props.height;
    elem.classList.add(INDICATOR_CSS_CLASS);

    return elem;
  };

  // Get an extension instance to enable users to access extension methods
  let getInstance = (cy) => {
    let instance = {
      // Returns whether the extension is active
      isActive: function() {
        return getScratchProp('active');
      },
      // Appends given menu item to the menu items list.
      appendMenuItem: function(item, parentID = undefined) {
        createAndAppendMenuItemComponent(item, parentID);
        return cy;
      },
      // Appends menu items in the given list to the menu items list.
      appendMenuItems: function(items, parentID = undefined) {
        createAndAppendMenuItemComponents(items, parentID);
        return cy;
      },
      // Removes the menu item with given ID.
      removeMenuItem: function(itemID) {
        let item = document.getElementById(itemID);
        if (item instanceof MenuItem) {
          cxtMenu.removeMenuItem(item);
        } else {
          console.error(`The item with id: ${itemID} is not a menu item`);
        }
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
      // Moves the item to the submenu of the parent with the given ID
      moveToSubmenu: function(itemID, parentID) {
        let item = document.getElementById(itemID);
        let parent = document.getElementById(parentID);
        
        if (item instanceof MenuItem && parent instanceof MenuItem) {
          cxtMenu.moveToSubmenu(item, parent);
        } else {
          console.error('Items must be menu items');
        }

        return cy;
      },
      // Moves the item with given ID before the existingitem.
      moveBeforeOtherMenuItem: function(itemID, existingItemID) {
        let item = document.getElementById(itemID);
        let before = document.getElementById(existingItemID);
        if (item instanceof MenuItem && before instanceof MenuItem) {
          cxtMenu.moveBefore(item, before);
        } else {
          console.error('Items must be menu items');
        }
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
    MenuItemList.define();
    ContextMenu.define();

    // merge the options with default ones
    options = utils.extend(DEFAULT_OPTS, opts);
    setScratchProp('options', options);

    // Clear old context menu if needed
    if (getScratchProp('active')) {
      destroyCxtMenu();
    }

    setScratchProp('active', true);

    setScratchProp('submenuIndicatorGen', makeSubmenuIndicator.bind(undefined, options.submenuIndicator));

    // Create cxtMenu and append it to body
    let cxtMenuClasses = utils.getClassStr(options.contextMenuClasses);
    setScratchProp('cxtMenuClasses', cxtMenuClasses);

    let onMenuItemClick = 
      () => setScratchProp('cxtMenuPosition', undefined);
      
    let scratchpad = cy.scratch('cycontextmenus');
    cxtMenu = new ContextMenu(onMenuItemClick, scratchpad);

    setScratchProp('cxtMenu', cxtMenu);
    document.body.appendChild(cxtMenu);

    setScratchProp('cxtMenuItemClasses', utils.getClassStr(options.menuItemClasses));
    let menuItems = options.menuItems;
    createAndAppendMenuItemComponents(menuItems);

    bindOnCxttap();
    bindCyEvents();
    utils.preventDefaultContextTap();
  }
  
  return getInstance(this);
}