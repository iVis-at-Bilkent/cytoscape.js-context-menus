import { setBooleanAttribute, getClassStr, isIn, getDimensionsHidden } from './utils';
import { DIVIDER_CSS_CLASS } from './constants';

// TODO: add submenu property
export class MenuItem extends HTMLButtonElement {
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
    constructor(
        params,
        onMenuItemClick,
        scratchpad
    ) {
        super();

        super.setAttribute('id', params.id);

        let className = this._getMenuItemClassStr(scratchpad['cxtMenuItemClasses'], params.hasTrailingDivider);

        super.setAttribute('class', className);

        if (typeof params.tooltipText !== undefined) {
            super.setAttribute('title', params.tooltipText);
        }

        if (params.disabled) {
            setBooleanAttribute(this, 'disabled', true);
        }
        
        if (params.image) {
            let img = document.createElement('img');
            img.src = params.image.src;
            img.width = params.image.width;
            img.height = params.image.height;
            img.style.position = 'absolute';
            img.style.top = params.image.y + 'px';
            img.style.left = params.image.x + 'px';
            
            super.appendChild(img);
        }

        this.innerHTML += params.content;

        this.onMenuItemClick = onMenuItemClick;

        this.data = {};
        this.clickFns = [];
        this.selector = params.selector;
        this.show = params.show || true;
        this.coreAsWell = params.coreAsWell || false;

        if (typeof params.onClickFunction === 'undefined' && 
            typeof params.submenu === 'undefined') {

            throw new Error("A menu item must either have click function or a submenu or both");
        }

        this.onClickFunction = params.onClickFunction;

        // Create the submenu if neccessary
        if (params.submenu instanceof Array) {
            // We generate another indicator for each
            let indicator = scratchpad['submenuIndicatorGen']();

            this.submenu = new MenuItemList(this.onMenuItemClick, scratchpad);
            this.appendChild(indicator);
            // TODO: add indicator
            this.appendChild(this.submenu);

            for (let item of params.submenu) {
                let menuItem = new MenuItem(item, this.onMenuItemClick, scratchpad);
                this.submenu.appendMenuItem(menuItem);
            }
            console.log('submenu: ', this.submenu);

            // submenu should be visible when mouse is over
            this.addEventListener('mouseenter', (_event) => {
                console.log('mouse enter', this.submenu.clientWidth);
                let rect = this.getBoundingClientRect();
                let submenuRect = getDimensionsHidden(this.submenu);

                let exceedsRight = (rect.right + submenuRect.width) > window.innerWidth;
                let exceedsBottom = (rect.top + submenuRect.height) > window.innerHeight;

                // Regular case
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

                

                this.submenu.display();
            });

            this.addEventListener('mouseleave', (event) => {
                console.log('mouseout')
                let pos = { x: event.clientX, y: event.clientY };

                // Hide if mouse is not passed to the submenu
                if (!isIn(pos, this.submenu)) {
                    this.submenu.hide();
                }
            });
        }
    }

    bindOnClickFunction(onClickFn) {
        this.clickFns.push(onClickFn);

        super.addEventListener('click', onClickFn);
    }

    unbindOnClickFunctions() {
        for (let onClickFn of this.clickFns) {
            super.removeEventListener('click', onClickFn);
        }
        this.clickFns = [];
    }

    enable() {
        setBooleanAttribute(this, 'disabled', false);
    }

    disable() {
        setBooleanAttribute(this, 'disabled', true);
    }

    hide() {
        this.show = false;
        this.style.display = 'none';
    }

    hasSubmenu() {
        return this.submenu !== undefined;
    }

    isClickable() {
        return this.onMenuItemClick !== undefined;
    }

    display() {
        this.show = true;
        this.style.display = 'block';
    }

    _getMenuItemClassStr(classStr, hasTrailingDivider) {
        return hasTrailingDivider ?
            classStr + ' ' + DIVIDER_CSS_CLASS :
            classStr;
    };  

    static define() {
        customElements.define('ctx-menu-item', MenuItem, { extends: 'button' });
    }
}

export class MenuItemList extends HTMLDivElement {
    constructor(onMenuItemClick, scratchpad) {
        super();

        super.setAttribute('class', scratchpad['cxtMenuClasses']);

        this.style.position = 'absolute';

        this.onMenuItemClick = onMenuItemClick;
        this.scratchpad = scratchpad;
    }

    hide() {
        this.hideMenuItemSubmenus();

        this.style.display = 'none';
    }

    display() {
        this.style.display = 'block';
    }

    /**
     * Hides all menu items
     */
    hideMenuItems(){
        for (let item of this.children) {
            if (item instanceof HTMLElement) {
                item.style.display = 'none';
            } else {
                console.warn(`${item} is not a HTMLElement`);
            }
        }
    }

    hideMenuItemSubmenus() {
        for (let menuItem of this.children) {
            if (menuItem instanceof MenuItem) {
                if (menuItem.submenu) {
                    menuItem.submenu.hide();
                }
            }
        }
    }

    /**
     * @param { MenuItem } menuItem 
     */
    appendMenuItem(menuItem) {
        super.appendChild(menuItem);

        if (menuItem.isClickable()) {
            this._performBindings(menuItem)
        }
    }

    insertBeforeExistingMenuItem(menuItem, existingItemID) {
        let existingItem = document.getElementById(existingItemID);
        if (existingItem.parentNode === this) {
            this.insertBefore(menuItem, existingItem);
        } else {
            throw new Error(`The item with id='${existingItemID}' is not a child of the context menu`);
        }
    }

    /**
     * @param { MenuItem } menuItem 
     */
    removeMenuItem(menuItem) {
        if (menuItem.parentNode === this) {
            this.removeChild(menuItem);
        } else {
            throw new Error(`The item with id='${menuItem.id}' is not a child of the context menu`)
        }
    }

    /**
     * Moves a menuItem before another
     * @param { string } menuItemID 
     * @param { string } otherMenuItemID 
     */
    moveBefore(menuItemID, otherMenuItemID) {
        if (menuItemID === otherMenuItemID) {
            return;
        }
        let menuItem = document.getElementById(menuItemID);
        let otherMenuItem = document.getElementById(otherMenuItemID);
        if (menuItem.parentNode !== this) {
            throw new Error(`The item with id='${menuItemID}' is not a child of context menu`);
        }
        if (otherMenuItem.parentNode !== this) {
            throw new Error(`The item with id='${otherMenuItemID}' is not a child of context menu`);
        }

        this.removeChild(menuItem);
        this.insertBefore(menuItem, otherMenuItem);
    }

    /**
     * @param { MenuItem } menuItem
     */
    _performBindings(menuItem) {
        let callback = this._bindOnClick(menuItem.onClickFunction);
        menuItem.bindOnClickFunction(callback);
        menuItem.bindOnClickFunction(this.onMenuItemClick);
    }

    _bindOnClick(onClickFn) {
        console.log('scratchpad: ', this.scratchpad);
        return () => {
            let event = this.scratchpad['currentCyEvent']; 
            onClickFn(event);
        };
    }

    static define() {
        customElements.define('menu-item-list', MenuItemList, { extends: 'div' });
    }
}

export class ContextMenu extends MenuItemList {

    constructor(onMenuItemClick, scratchpad) {
        super(onMenuItemClick, scratchpad);

        // Called when a menu item is clicked
        this.onMenuItemClick = (event) => {
            // So that parent menuItems won't be clicked
            event.stopPropagation();
            this.hide();
            onMenuItemClick();
        };

        /* this.addEventListener('mouseleave', (_event) => {
            this.hideMenuItemSubmenus();
        }); */
    }

    static define() {
        customElements.define('ctx-menu', ContextMenu, { extends: 'div' });
    }
}