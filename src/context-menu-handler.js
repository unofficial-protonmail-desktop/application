export const ContextMenuHandler = {
  menus: {},
  
  addContextMenu: (name, cb) => {
    ContextMenuHandler.menus[name] = cb;
  },
};

require('electron-context-menu')({
  prepend: (params, browserWindow) => {
    const targetElement = document.elementFromPoint(params.x, params.y);
    const cb = targetElement.getAttribute('prepend-context-menu');
    
    if (typeof ContextMenuHandler.menus[cb] === 'function') {
      return ContextMenuHandler.menus[cb](params, browserWindow, targetElement);
    }
  }
});
