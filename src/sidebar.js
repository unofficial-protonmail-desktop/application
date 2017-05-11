export class Sidebar {
	constructor(page) {
		const TabGroup = require('electron-tabs');
		this.tabGroup = new TabGroup();
		
		this.addEventListenerForAddAccount();
	}
	
	addEventListenerForAddAccount() {
		document.querySelector("[action-add-account]").addEventListener("click", () => this.addAccount());
	}

	addAccount() {
		const swal = require('sweetalert');
		const options = {
			title: "Account name",
			text: "Enter the name of your ProtonMail account",
			type: "input",
			confirmButtonText: "Add account",
		};
		const onConfirmCallback = (name) => !!name ? this.createTab(name) : null;
		
		swal(options, onConfirmCallback);
	}
	
	createTab(name, active = false) {
		this.tabGroup.addTab({
			title: name,
			src: "https://mail.protonmail.com/login?",
			visible: true,
			closable: false,
			active: true,
			ready: (tab) => this.onTabReady(tab)
		});
	}
	
	onTabReady(tab) {
		const domReadyEvent = () => {
			this.prefillUsernameInLoginForm(tab.webview.getWebContents(), tab.title);
			
			tab.webview.removeEventListener("dom-ready", domReadyEvent);
		};
		
		tab.webview.addEventListener("dom-ready", domReadyEvent);
	}
	
	prefillUsernameInLoginForm(webContents, username) {
		for (let character of username) {
			webContents.sendInputEvent({
				type: "char",
				keyCode: character
			});
		}
	}
}
