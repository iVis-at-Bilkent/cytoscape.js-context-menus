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

export default utils;