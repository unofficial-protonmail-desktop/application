/* eslint-disable */
const ContextMenuHandler = require('electron-context-menu-handler/context-menu-handler');
const { ipcRenderer, shell } = require('electron');
const settings = require('electron-settings');

export class Sidebar {
  constructor() {
    const TabGroup = require('electron-tabs');
    const dragula = require('dragula');

    this.tabGroup = new TabGroup({
      ready: function(tabGroup) {
        dragula([tabGroup.tabContainer], {
          direction: 'vertical',
          mirrorContainer: document.querySelector('.etabs-tabs')
        });
      }
    })
      .on('tab-removed', this.onTabRemoved.bind(null))
      .on('tab-active', this.onTabActive.bind(null));

    this.addEventListenerForAddAccount();
    this.initiateTabs();
    this.listenForBrowserWindowFocus();
  }

  initiateTabs() {
    /* This is an ugly way to do it, but as electron-tabs does not allow
      setting the ID, in order to have the same tabs ID on the saved json and
      the generated we need to resave once we reload the saved tabs. */
    const tabSettingsArray = settings.get('SavedTabs', []);
    const postSettingsArray = [];

    tabSettingsArray.map((savedtab, index) => {
      this.tabGroup.addTab({
        title: savedtab.title.substr(0, 1),
        src: 'https://mail.protonmail.com/login',
        visible: true,
        active: !index,
        ready: (tab) => {
          postSettingsArray.push({ id: tab.id, title: savedtab.title, active: savedtab.active });
          this.onTabReady(tab, savedtab.title);
        }
      });
    });

    settings.set('SavedTabs', postSettingsArray);
  }

  listenForBrowserWindowFocus() {
    ipcRenderer.send('listen-for-browser-window-focus');

    ipcRenderer.on('browser-window-focus', () => {
      const activeTab = this.tabGroup.getActiveTab();

      if (activeTab) {
        activeTab.webview.focus();
      }
    });
  }

  onTabRemoved(tab) {
    const tabSettingsArray = settings.get('SavedTabs', []);

    for (let i = 0; i < tabSettingsArray.length; i++)
      if (tabSettingsArray[i].id === tab.id) {
        tabSettingsArray.splice(i, 1);
        break;
      }

    settings.set('SavedTabs', tabSettingsArray);
  }

  addEventListenerForAddAccount() {
    document.querySelector('[action-add-account]').addEventListener('click', () => this.addAccount());
  }

  addAccount() {
    const swal = require('sweetalert2');

    const options = {
      title: 'Account name',
      text: 'Enter the name of your ProtonMail account',
      input: 'text',
      confirmButtonText: 'Add account',
      showCancelButton: true,
    };
    const onConfirmCallback = (name) => name ? this.createTab(name) : null;

    swal(options).then((result) => onConfirmCallback(result.value));
  }

  createTab(name) {
    this.tabGroup.addTab({
      title: name.substr(0, 1),
      src: 'https://mail.protonmail.com/login',
      visible: true,
      active: true,
      ready: (tab) => {
        this.onTabReady(tab, name);
        const tabSettingsArray = [{ id: tab.id, title: name, active: tab.active }];
        settings.set('SavedTabs', settings.get('SavedTabs', []).concat(tabSettingsArray));
      }
    });
  }

  onTabReady(tab, name) {
    const path = require('path');
    const jetpack = require('fs-jetpack');

    const domReadyEvent = () => {
      tab.webview.insertCSS(jetpack.read(path.join(__dirname, 'styles/pm_webclient-overrides.css'), 'utf8'));
      tab.webview.removeEventListener('dom-ready', domReadyEvent);
      this.prefillUsernameInLoginForm(tab.webview.getWebContents(), name);
    };

    this.prepareContextMenu(tab);
    tab.tabElements.title.setAttribute('tab-id', tab.id);
    tab.webview.addEventListener('dom-ready', domReadyEvent);
    tab.webview.addEventListener('page-title-updated', () => this.onTabTitleUpdate());
    tab.webview.addEventListener('new-window', event => {
      event.preventDefault();
      shell.openExternal(event.url);
    });
    require('electron-context-menu')({
      window: tab.webview,
    });
  }

  onTabActive(tab) {
    tab.webview.focus();
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
    const injectedPrefiller = function (_username) {
      const _usernameElemWatcher = setInterval(() => {
        const _usernameElem = document.querySelector('[name=username]');
        if (!_usernameElem) return;

        _usernameElem.value = _username;
        clearInterval(_usernameElemWatcher);
      }, 100);
    };

    webContents.executeJavaScript('('.concat(injectedPrefiller, `('${username}'))`));
  }

  onTabTitleUpdate() {
    let totalCount = 0;

    for (let _tab of this.tabGroup.tabs) {
      let extractedTitle = (/\(([0-9]+)\)/).exec(_tab.webview.getTitle());
      let unreadCount = extractedTitle ? parseInt(extractedTitle[1]) : 0;

      totalCount += unreadCount;
      unreadCount = (unreadCount > 99) ? '99<sub>+</sub>' : unreadCount;

      _tab.setBadge(unreadCount ? unreadCount : '');
    }

    ipcRenderer.send('set-badge', totalCount);
  }
}
