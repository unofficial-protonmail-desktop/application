import { ipcRenderer as ipc } from 'electron';

class TabHandler {

}

exports.initiateTabs = () => {
	document.addEventListener('click', (e) => {
		if (e.target.parentElement.hasAttribute('action-add-account')) {
			console.log('sending event');
			ipc.send('createAccount');
		}
	});
};
