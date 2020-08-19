module.exports = {
  ipcRenderer: {
    on: () => null,
    send: () => true,
  },
  remote: {
    getCurrentWindow: () => null,
    Menu: {
      buildFromTemplate: () => null,
    },
  },
  shell: {
    openExternal: () => true,
  },
};
