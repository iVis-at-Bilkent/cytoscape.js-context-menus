;(function($$, $){ 'use strict';

  var register = function( cytoscape ){
    
    if( !cytoscape ){ return; } // can't register if cytoscape unspecified
    
    var options = {
      menuItems: [
        {
          id: 'remove',
          selector: 'node, edge',
          onClickFunction: function () {
            console.log('remove element');
          }
        },
        {
          id: 'hide',
          selector: 'node, edge',
          onClickFunction: function () {
            console.log('hide element');
          },
          hasFollowingDivider: true,
          disabled: true
        }
      ],
      // css classes that menu items will have
      classes: [
        // add class names to this list
      ]
    };
    
    var $ctxMenu;
    var menuItemCSSClass;

    function setOptions(from) {
      var tempOpts = {};
      for (var key in options)
        tempOpts[key] = options[key];

      for (var key in from)
        if (tempOpts.hasOwnProperty(key))
          tempOpts[key] = from[key];
      return tempOpts;
    }
    
    function registerMenuItems(menuItems) {
      for (var i = 0; i < menuItems.length; i++) {
        registerMenuItem(menuItems[i]);
      }
    }
    
    function registerMenuItem(menuItem) {
      
    }
    
    // create ctxMenu and append it to body
    function createAndAppendCtxMenuComponent() {
      $ctxMenu = $('<div id="ctxMenu">');
      $('body').append($ctxMenu);
      
      return $ctxMenu;
    }
    
    function createMenuItemComponent(item) {
      var classStr = getClassStr();
      var itemStr = '<menu id="' + item.id + '"title="' + item.title + '" class="' + classStr + '"></menu>';
      var $menuItemComponent = $(itemStr);
      
      return $menuItemComponent;
    }
    
    function getClassStr() {
      var classes = options.classes;
      var str = '';
      
      for( var i = 0; i < classes.length; i++ ) {
        var className = classes[i];
        if(str !== menuItemCSSClass) {
          str += className;
        }
      }
      
      str += menuItemCSSClass;
      
      return str;
    }
    
    cytoscape('core', 'contextMenus', function (opts) {
      var cy = this;

      // merge the options with default ones
      options = setOptions(opts);
      
      var menuItems = options.menuItems;
      registerMenuItems(menuItems);
      
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
