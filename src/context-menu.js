import { setBooleanAttribute } from './utils';

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

    static define() {
        customElements.define('ctx-menu-item', MenuItem, { extends: 'button' });
    }
}