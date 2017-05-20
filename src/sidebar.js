export class Sidebar {
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
            })
            .on("tab-removed", (tab, tabGroup) => {
                this.onTabRemoved(tab);
            });

        this.addEventListenerForAddAccount();
        this.onTabStart();

    }

    onTabStart() {
      /* This is an ugly way to do it, but as electron-tabs does not allow
      setting the ID, in order to have the same tabs ID on the saved json and
      the generated we need to resave once we reload the saved tabs. */
        const config = require('./config');
        const tabSettingsArray = config.get('SavedTabs');
        const postSettingsArray = [];
        const that = this;

        tabSettingsArray.map(function(savedtab) {
            that.tabGroup.addTab({
                title: savedtab.title.substr(0, 1),
                src: "https://mail.protonmail.com/login?",
                visible: true,
                active: false,
                ready: (tab) => {
                    postSettingsArray.push({ id: tab.id, title: savedtab.title, active: savedtab.active });
                    that.onTabReady(tab, savedtab.title);
                }
            });
        });
        config.set("SavedTabs", postSettingsArray);
    }

    onTabRemoved(tab) {
        const config = require('./config');

        const tabSettingsArray = config.get('SavedTabs');

        for (var i = 0; i < tabSettingsArray.length; i++)
            if (tabSettingsArray[i].id === tab.id) {
                tabSettingsArray.splice(i, 1);
                break;
            }

        config.set("SavedTabs", tabSettingsArray);
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
        const onConfirmCallback = (name) => !!name ? this.createTab(name) : null;

        swal(options, onConfirmCallback);
    }

    createTab(name, active = false) {
        const config = require('./config');

        this.tabGroup.addTab({
            title: name.substr(0, 1),
            src: "https://mail.protonmail.com/login?",
            visible: true,
            active: true,
            ready: (tab) => {
                this.onTabReady(tab, name);

                const tabSettingsArray = [{ id: tab.id, title: name, active: tab.active }];

                config.set("SavedTabs", config.get("SavedTabs").concat(tabSettingsArray));
            }
        });

    }

    onTabReady(tab, name) {
        const domReadyEvent = () => {
            this.prefillUsernameInLoginForm(tab.webview.getWebContents(), name);

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
