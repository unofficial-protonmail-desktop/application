(function () {'use strict';

var electron = require('electron');

exports.initiateTabs = () => {
	document.addEventListener('click', (e) => {
		if (e.target.parentElement.hasAttribute('action-add-account')) {
			console.log('sending event');
			electron.ipcRenderer.send('createAccount');
		}
	});
};

}());
//# sourceMappingURL=tabs.js.map