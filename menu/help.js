const electron = require('electron');

module.exports = {
    role: 'help',
    submenu: [
        {
            label: 'Learn More',
            click () {
                electron.shell.openExternal('http://www.codearcs.de')
            }
        }
    ]
};
