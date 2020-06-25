// Utility functions that are not directly related with the extension
export function getOffset(el) {
    let rect = el.getBoundingClientRect();

    return {
        top: rect.top,
        left: rect.left, 
    };
}

export function matches(el, selector) {
    return (el.matches || 
        el.matchesSelector || 
        el.msMatchesSelector || 
        el.mozMatchesSelector || 
        el.webkitMatchesSelector || 
        el.oMatchesSelector).call(el, selector);
}

export function isElementHidden(elem) {
    return elem.offsetWidth <= 0 && elem.offsetHeight <= 0 ||
        ((elem.style && elem.style.display) || getComputedStyle(elem)['display']);
}

export function isElementVisible(elem) {
    return !isElementHidden(elem);
}
// Merge default options with the ones coming from parameter
export function extend(defaults, options) {
    let obj = {};

    for (let i in defaults) {
      obj[i] = defaults[i];
    }

    for (let i in options) {
      obj[i] = options[i];
    }

    return obj;
}

// Get string representation of css classes
export function getClassStr(classes) {
    let str = '';

    for (let i = 0; i < classes.length; i++) {
      let className = classes[i];
      str += className;
      if (i !== classes.length - 1) {
        str += ' ';
      }
    }

    return str;
}

export function preventDefaultContextTap() {
    let contextMenuAreas = document.getElementsByClassName('cy-context-menus-cxt-menu');

    for (const cxtMenuArea of contextMenuAreas) {
      cxtMenuArea.addEventListener('contextmenu', e => e.preventDefault());
    }
}