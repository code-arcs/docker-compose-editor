const electron = require('electron');
const app = electron.app;
const translate = require('../i18n')(app.getLocale());

module.exports = {
    label: translate('menu.help.label'),
    submenu: [
        {
            label: translate('menu.help.info.label') + '...',
            click () {
                electron.shell.openExternal('http://www.codearcs.de')
            }
        }
    ]
};
