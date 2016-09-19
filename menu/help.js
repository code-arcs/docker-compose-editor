const electron = require('electron');
const _ = require('../i18n');

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
