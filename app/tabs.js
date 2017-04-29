(function () {'use strict';

var electron = require('electron');

exports.initiateTabs = () => {
	document.addEventListener('click', (e) => {
		if (e.target.parentElement.hasAttribute('action-add-account')) {
			console.log('sending event');
			electron.ipcRenderer.sendSync('create-account');
		}
	});
};

}());
//# sourceMappingURL=tabs.js.map