const electron = require('electron');
const app = electron.app;
const _ = require('../i18n')(app.getLocale());

module.exports = {
    label: _('menu.help.label'),
    submenu: [
        {
            label: _('menu.help.info.label') + '...',
            click () {
                electron.shell.openExternal('http://www.codearcs.de')
            }
        }
    ]
};
