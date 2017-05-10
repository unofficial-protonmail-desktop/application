const swal = require('sweetalert');

exports.initiateTabs = () => {
	const TabGroup = require('electron-tabs');
	const tabGroup = new TabGroup();
	
	document.querySelector("[action-add-account]").addEventListener("click", () => addAccount());

	const addAccount = () => {
		const options = {
			title: "Account name",
			text: "Enter the name of your ProtonMail account",
			type: "input",
			confirmButtonText: "Add account",
		};
		const onConfirmCallback = (name) => !!name ? createTab(name) : null;

		swal(options, onConfirmCallback);
	};
	
	const createTab = (name, active = false) => {
		tabGroup.addTab({
			title: name,
			src: "https://mail.protonmail.com/login?",
			visible: true,
			closable: false,
			active: true,
			ready: (tab) => onTabReady(tab)
		});
	};

	const onTabReady = (tab) => {
		const domReadyEvent = () => {
			prefillUsernameInLoginForm(tab.webview.getWebContents(), tab.title);
			
			tab.webview.removeEventListener('dom-ready', domReadyEvent);
		};

		tab.webview.addEventListener('dom-ready', domReadyEvent);
	};
	
	const prefillUsernameInLoginForm = (webContents, username) => {
		for (let character of username) {
			webContents.sendInputEvent({
				type: 'char',
				keyCode: character
			});
		}
	};
};
