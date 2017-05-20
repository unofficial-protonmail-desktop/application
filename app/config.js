(function () {'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var Config = _interopDefault(require('electron-config'));

module.exports = new Config({
    defaults: {
        SavedTabs: [],
    }
});

}());
//# sourceMappingURL=config.js.map