import { contextMenus } from './cytoscape-context-menus.js';

export default function register(cytoscape) {
    if (!cytoscape) { 
        return; 
    } // can't register if cytoscape unspecified

    cytoscape('core', 'contextMenus', contextMenus);
}

// @ts-ignore
if (typeof cytoscape !== 'undefined') {
    // Register for plain javascript
    // @ts-ignore
    register(cytoscape);
}