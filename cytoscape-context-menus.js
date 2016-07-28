;(function($$, $){ 'use strict';

  var register = function( cytoscape ){
    
    if( !cytoscape ){ return; } // can't register if cytoscape unspecified
    var cy;
    
    var options = {
      menuItems: [
        {
          id: 'remove',
          title: 'remove',
          selector: 'node, edge',
          onClickFunction: function () {
            console.log('remove element');
          },
          hasTrailingDivider: true
        },
        {
          id: 'hide',
          title: 'hide',
          selector: 'node, edge',
          onClickFunction: function () {
            console.log('hide element');
          },
          disabled: true
        }
      ],
      // css classes that menu items will have
      classes: [
        // add class names to this list
      ]
    };
    
    var $cxtMenu;
    var menuItemCSSClass = 'cy-context-menus-cxt-menuitem';
    var dividerCSSClass = 'cy-context-menus-divider';

    // Merge default options with the ones coming from parameter
    function setOptions(from) {
      var tempOpts = {};
      for (var key in options)
        tempOpts[key] = options[key];

      for (var key in from)
        if (tempOpts.hasOwnProperty(key))
          tempOpts[key] = from[key];
      return tempOpts;
    }
    
    function preventDefaultContextTap() {
      $("#cy-context-menus-cxt-menu").contextmenu( function() {
          return false;
      });
    }
    
    // Get string representation of css classes
    function getClassStr(hasTrailingDivider) {
      var classes = options.classes;
      var str = '';
      
      for( var i = 0; i < classes.length; i++ ) {
        var className = classes[i];
        if(str !== menuItemCSSClass && str !== dividerCSSClass) {
          str += className + ' ';
        }
      }
      
      str += menuItemCSSClass;
      
      if(hasTrailingDivider) {
        str += ' ' + dividerCSSClass;
      }
      
      return str;
    }
    
    function displayComponent($component) {
      $component.css('display', 'block');
    }
    
    function hideComponent($component) {
      $component.css('display', 'none');
    }
    
    function hideMenuItemComponents() {
      $cxtMenu.children().css('display', 'none');
    }
    
    function bindOnClickFunction($component, onClickFcn) {
      $component.on('click', onClickFcn);
    }
    
    function bindCyCxttap($component, selector) {
      var cxtfcn;
      
      cy.elements(selector).on('cxttap', cxtfcn = function(event) {
        adjustCxtMenu(event);
        displayComponent($component);
      });
      
      // Bind the event to menu item to be able to remove it back
      $component.data('cy-context-menus-cxtfcn', cxtfcn);
    }
    
    function bindCyEvents() {
      cy.on('tapstart', function(){
        hideComponent($cxtMenu);
        cy.removeScratch('cxtMenuPosition');
      });
    }
    
    function performBindings($component, onClickFcn, selector) {
      bindOnClickFunction($component, onClickFcn);
      bindCyCxttap($component, selector);
    }
    
    // Adjusts context menu if necessary
    function adjustCxtMenu(event) {
      var currentCxtMenuPosition = cy.scratch('cxtMenuPosition');
      
      if( currentCxtMenuPosition != event.cyPosition ) {
        hideMenuItemComponents();
        cy.scratch('cxtMenuPosition', event.cyPosition);
        
        var containerPos = $(cy.container()).position();

        var left = containerPos.left + event.cyRenderedPosition.x;
        var top = containerPos.top + event.cyRenderedPosition.y;
        
        displayComponent($cxtMenu);
        $cxtMenu.css('left', left);
        $cxtMenu.css('top', top);
      }
    }
    
    function createAndAppendMenuItemComponents(menuItems) {
      for (var i = 0; i < menuItems.length; i++) {
        createAndAppendMenuItemComponent(menuItems[i]);
      }
    }
    
    function createAndAppendMenuItemComponent(menuItem) {
      // Create and append menu item
      var $menuItemComponent = createMenuItemComponent(menuItem);
      appendComponentToCxtMenu($menuItemComponent);
      
      performBindings($menuItemComponent, menuItem.onClickFunction, menuItem.selector);
    }//insertComponentBeforeExistingItem(component, existingItemID)
    
    function createAndInsertMenuItemComponentBeforeExistingComponent(menuItem, existingComponentID) {
      // Create and insert menu item
      var $menuItemComponent = createMenuItemComponent(menuItem);
      insertComponentBeforeExistingItem($menuItemComponent, existingComponentID);
      
      performBindings($menuItemComponent, menuItem.onClickFunction, menuItem.selector);
    }
    
    // create cxtMenu and append it to body
    function createAndAppendCxtMenuComponent() {
      $cxtMenu = $('<div id="cy-context-menus-cxt-menu">');
      $('body').append($cxtMenu);
      
      return $cxtMenu;
    }
    
    // Creates a menu item as an html component
    function createMenuItemComponent(item) {
      var classStr = getClassStr(item.hasTrailingDivider);
      var itemStr = '<menu id="' + item.id + '" title="' + item.title + '" class="' + classStr;
      
//      if(item.disabled) {
//        itemStr += 'disabled';
//      }
      
      itemStr += '"></menu>';
      var $menuItemComponent = $(itemStr);
      
      return $menuItemComponent;
    }
    
    // Appends the given component to cxtMenu
    function appendComponentToCxtMenu(component) {
      $cxtMenu.append(component);
    }
    
    // Insert the given component to cxtMenu just before the existing item with given ID
    function insertComponentBeforeExistingItem(component, existingItemID) {
      var $existingItem = $('#' + existingItemID);
      component.insertBefore($existingItem);
    }
    
    function removeAndUnbindMenuItem(itemID) {
      var menuItems = options.menuItems;
      var menuItem;
      
      for(var i = 0; i < menuItems.length; i++) {
        if(menuItems[i].id = itemID) {
          menuItem = menuItems[i];
          break;
        }
      }
      
      var $component = $('#' + itemID);
      var cxtfcn = $component.data('cy-context-menus-cxtfcn');
      var selector = menuItem.selector;
      var onClickFcn = menuItem.onClickFunction;
      
      if(cxtfcn) {
        cy.elements(selector).off('cxttap', cxtfcn);
      }
      
      if(onClickFcn) {
        $component.off('click', onClickFcn);
      }
      
      $component.remove();
    }
    
    cytoscape('core', 'contextMenus', function (opts) {
      cy = this;

      // merge the options with default ones
      options = setOptions(opts);
      
      // Clear context menu
      if($cxtMenu) {
        $cxtMenu.children().remove();
        $cxtMenu.remove();
      }
      
      $cxtMenu = createAndAppendCxtMenuComponent();
      
      var menuItems = options.menuItems;
      createAndAppendMenuItemComponents(menuItems);
      
      bindCyEvents();
      preventDefaultContextTap();
      
      $(".cy-context-menus-cxt-menuitem").click( function() {
          hideComponent($cxtMenu);
          cy.removeScratch('cxtMenuPosition');
      });
      
      return this; // chainability
    });
    
    cytoscape('core', 'removeMenuItem', function (itemID) {
      cy = this;

      removeAndUnbindMenuItem(itemID);
      
      return this; // chainability
    });
    
    cytoscape('core', 'insertBeforeMenuItem', function (item, existingItemID) {
      cy = this;

      createAndInsertMenuItemComponentBeforeExistingComponent(item, existingItemID);
      
      return this; // chainability
    });
    
    cytoscape('core', 'appendMenuItem', function (item) {
      cy = this;

      createAndAppendMenuItemComponent(item);
      
      return this; // chainability
    });
    
    cytoscape('core', 'appendMenuItems', function (items) {
      cy = this;

      createAndAppendMenuItemComponents(items);
      
      return this; // chainability
    });
  };

  if( typeof module !== 'undefined' && module.exports ){ // expose as a commonjs module
    module.exports = register;
  }

  if( typeof define !== 'undefined' && define.amd ){ // expose as an amd/requirejs module
    define('cytoscape-context-menus', function(){
      return register;
    });
  }

  if( typeof cytoscape !== 'undefined' ){ // expose to global cytoscape (i.e. window.cytoscape)
    register( cytoscape );
  }

})(cytoscape, jQuery);
