module.exports = {
  ipcRenderer: {
    on: () => null,
    send: () => true,
  },
  shell: {
    openExternal: () => true,
  },
};
