import { ipcRenderer } from 'electron';

export const updateIconBadge = () => (dispatch, getState) => {
  const totalUnread = Object.values(getState().accounts)
    .reduce((count, account) => (count + (account.unreadEmails || 0)), 0);

  ipcRenderer.send('set-badge', totalUnread);
};
