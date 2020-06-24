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