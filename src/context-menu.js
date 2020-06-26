import { setBooleanAttribute } from './utils';
import { CXT_MENU_CSS_CLASS } from './constants';

// TODO: add submenu property
export class MenuItem extends HTMLButtonElement {
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
    constructor(
        params
    ) {
        super();

        super.setAttribute('id', params.id);
        super.setAttribute('class', params.className);

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

        super.innerHTML += params.content;

        this.data = {};
        this.clickFns = [];
        this.selector = params.selector;
        this.show = params.show || true;

        console.log(this);
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

    display() {
        this.show = true;
        this.style.display = 'block';
    }

    static define() {
        customElements.define('ctx-menu-item', MenuItem, { extends: 'button' });
    }
}

export class ContextMenu extends HTMLDivElement {

    /**
     * @param {string} classes
     */
    constructor(classes, onMenuItemClick) {
        super();

        super.setAttribute('class', classes);
        super.style.position = 'absolute';
        super.classList.add(CXT_MENU_CSS_CLASS);

        // Called when a menu item is clicked
        this.onMenuItemClick = () => {
            this.hide();
            onMenuItemClick;
        };
    }

    hide() {
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

    /**
     * 
     * @param { MenuItem } menuItem 
     */
    appendMenuItem(menuItem) {
        super.appendChild(menuItem);

        // Bind click function to menuItem
        menuItem.bindOnClickFunction(this.onMenuItemClick);
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

    static define() {
        customElements.define('ctx-menu', ContextMenu, { extends: 'div' });
    }
}