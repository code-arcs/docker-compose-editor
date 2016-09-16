const {dialog, ipcMain} = require('electron');

module.exports = {
    label: 'Hans Wurst',
    submenu: [
        {
            label: 'Open...',
            click (item, focusedWindow) {
                const dialogOpts = {
                    properties: ['openFile'],
                    filters: [
                        {name: 'Docker-Compose-File', extensions: ['yml', 'yaml']}
                    ]
                };

                focusedWindow.webContents.send('open-file', dialog.showOpenDialog(dialogOpts))
            }
        }
    ]
};