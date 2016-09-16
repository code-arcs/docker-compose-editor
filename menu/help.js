const electron = require('electron');

module.exports = {
    role: 'help',
    submenu: [
        {
            label: 'Learn More',
            click () {
                electron.shell.openExternal('http://www.codearcs.de')
            }
        },
        {
            label: 'Toggle Developer Tools',
            accelerator: process.platform === 'darwin' ? 'Alt+Command+I' : 'Ctrl+Shift+I',
            click (item, focusedWindow) {
                if (focusedWindow) focusedWindow.webContents.toggleDevTools()
            }
        }
    ]
};
