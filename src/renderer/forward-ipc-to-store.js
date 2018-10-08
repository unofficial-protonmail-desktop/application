import { ipcRenderer } from 'electron';
import { TOGGLE_SIDEBAR } from './containers/App/types';

export default store => {
  ipcRenderer.on('toggleSidebar',  () => {
    store.dispatch({ type: TOGGLE_SIDEBAR });
  });
};

