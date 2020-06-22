function getOffset(el) {
    let rect = el.getBoundingClientRect();

    return {
        top: rect.top,
        left: rect.left, 
    };
}

// http://youmightnotneedjquery.com/
function matches(el, selector) {
    return (el.matches || 
        el.matchesSelector || 
        el.msMatchesSelector || 
        el.mozMatchesSelector || 
        el.webkitMatchesSelector || 
        el.oMatchesSelector).call(el, selector);
}

// based on jQuery.expr.filters.hidden in http://code.jquery.com/jquery-latest.js
function isElementHidden(elem) {
    return elem.offsetWidth <= 0 && elem.offsetHeight <= 0 ||
        ((elem.style && elem.style.display) || getComputedStylet(elem)['display']);
}

function isElementVisible(elem) {
    return !isElementHidden(elem);
}

const utils = {
    getOffset,
    matches,
    isElementVisible,
    isElementHidden,
};

export default utils;