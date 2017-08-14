const ContextMenuHandler = require('electron-context-menu-handler/context-menu-handler');
const { ipcRenderer } = require('electron');
const open = require('open');

export class Sidebar {
    constructor(page) {
        const TabGroup = require('electron-tabs');
        const dragula = require('dragula');

        this.tabGroup = new TabGroup({
                ready: function(tabGroup) {
                    dragula([tabGroup.tabContainer], {
                        direction: "vertical",
                        mirrorContainer: document.querySelector(".etabs-tabs")
                    });
                }
            })
            .on('tab-removed', this.onTabRemoved.bind(null));
        this.addEventListenerForAddAccount();
        this.initiateTabs();
    }

    initiateTabs() {
      /* This is an ugly way to do it, but as electron-tabs does not allow
      setting the ID, in order to have the same tabs ID on the saved json and
      the generated we need to resave once we reload the saved tabs. */
        const config = require('./config');
        const tabSettingsArray = config.get('SavedTabs');
        const postSettingsArray = [];

        tabSettingsArray.map((savedtab, index) => {
          this.tabGroup.addTab({
            title: savedtab.title.substr(0, 1),
            src: "https://mail.protonmail.com/login?",
            visible: true,
            active: !index,
            ready: (tab) => {
              postSettingsArray.push({ id: tab.id, title: savedtab.title, active: savedtab.active });
              this.onTabReady(tab, savedtab.title);
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

      this.prepareContextMenu(tab);
      tab.tabElements.title.setAttribute('tab-id', tab.id);
        tab.webview.addEventListener("dom-ready", domReadyEvent);
        tab.webview.addEventListener("page-title-updated", () => this.onTabTitleUpdate());
        tab.webview.addEventListener('new-window', (e) => {
          e.preventDefault();
          open(e.url);
        });
    }
    
    prepareContextMenu(tab) {
      const functionName = 'sidebarItemContextMenu';
  
      tab.tabElements.title.setAttribute('prepend-context-menu', functionName);
      tab.tabElements.title.setAttribute('tab-id', tab.id);

      const tabs = this.tabGroup.tabs;
      ContextMenuHandler.addPrependContextMenu(functionName, (params, browserWindow, targetElement) => {
        return [{
          label: 'Remove tab',
          visible: true,
          click: () => {
            const tabId = parseInt(targetElement.getAttribute('tab-id'));
            const tab = tabs.find(_tab => _tab.id === tabId);
            tab.close();
          },
        }];
      });
    }

    prefillUsernameInLoginForm(webContents, username) {
      webContents.executeJavaScript(`document.querySelector('[name=username]').value = '${username}'`);
    }
    
    onTabTitleUpdate() {
      let totalCount = 0;
      
      for (let _tab of this.tabGroup.tabs) {
        let extractedTitle = (/\(([0-9]+)\)/).exec(_tab.webview.getTitle());
        let unreadCount = extractedTitle ? parseInt(extractedTitle[1]) : 0;

        totalCount += unreadCount;
        _tab.setBadge(unreadCount ? unreadCount : '');
      }
  
      ipcRenderer.send('set-badge', totalCount);
    }
}
