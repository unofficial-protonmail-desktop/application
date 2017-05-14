(function () {'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

class Sidebar {
    constructor(page) {
        const TabGroup = require('electron-tabs');
        const dragula = require("dragula");

        this.tabGroup = new TabGroup({
            ready: function(tabGroup) {
                dragula([tabGroup.tabContainer], {
                    direction: "vertical",
                    mirrorContainer: document.querySelector(".etabs-tabs")
                });
            }
        });

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
            showCancelButton: true,
            allowOutsideClick: true,
            close
        };
        const onConfirmCallback = (name) => !!name ? this.createTab(name.substr(0, 1)) : null;

        swal(options, onConfirmCallback);
    }

    createTab(name, active = false) {
        this.tabGroup.addTab({
            title: name,
            src: "https://mail.protonmail.com/login?",
            visible: true,
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

exports.Sidebar = Sidebar;

}());
//# sourceMappingURL=sidebar.js.map