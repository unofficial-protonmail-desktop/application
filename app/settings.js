(function () {'use strict';

const settings = require('electron-settings');

alert(settings.get('darkMode'));

class Settings {
  constructor() {
    this.tabLinks = document.querySelectorAll('ul.tabs li a');
    this.tabSections = document.querySelectorAll('section.tab-content');
    this.initiateTabLinks();
  }

  initiateTabLinks() {
    this.tabLinks.forEach(tabLink =>
      tabLink.onclick = this.onTabLinkClick.bind(this)
    );
  }

  onTabLinkClick(event) {
    event.preventDefault();
    const targetSection = event.target
      .getAttribute('href');
    this.tabSections
      .forEach(section => { section.style.display = 'none'; });

    document.querySelector(targetSection).style.display = 'block';

    this.tabLinks.forEach(tabLink => { tabLink.removeAttribute('class'); });

    event.target.setAttribute('class', 'is-active');
  }
}
new Settings();

}());
//# sourceMappingURL=settings.js.map