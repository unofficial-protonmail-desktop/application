(function () {'use strict';

const swal = require('sweetalert');

exports.initiateTabs = () => {
	const TabGroup = require('electron-tabs');
	const tabGroup = new TabGroup();

	function createTab(name, active = false) {
		const tab = tabGroup.addTab({
			title: name,
			src: "https://mail.protonmail.com/login?",
			visible: true,
			closable: false,
			active: active
		});
	}
	
	document.querySelector("[action-add-account]").addEventListener("click", function (e) {
		swal({
			title: "Account name",
			text: "Enter the name of your ProtonMail account",
			type: "input",
			confirmButtonText: "Add account",
			
		}, function (name) {
			if (name !== false) {
				createTab(name);
			}
		});
	});
};

}());
//# sourceMappingURL=sidebar.js.map