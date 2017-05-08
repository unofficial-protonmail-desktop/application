(function () {'use strict';

require('electron');

exports.initiateTabs = () => {
	const TabGroup = require('electron-tabs');

	function createTab(name, active = false) {
		const tabGroup = new TabGroup();
		const tab = tabGroup.addTab({
			title: name,
			src: "https://mail.protonmail.com/login",
			visible: true,
			closable: false
		});
		
		if (active)  {
			tab.activate();
		}
	}
	
	document.addEventListener('click', (e) => {
		if (e.target.parentElement.hasAttribute('action-add-account')) {
			createTab('my@email.com');
		}
	});
};

}());
//# sourceMappingURL=sidebar.js.map