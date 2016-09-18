const electron = require('electron');
const dialog = electron.dialog;
const ipcMain = electron.ipcMain;
const app = electron.app;
const translate = require('../i18n')(app.getLocale());
const fs = require('fs');

module.exports = {
    label: translate('menu.file.label'),
    submenu: [
        {
            label: translate('menu.file.open.label') + '...',
            accelerator: 'Ctrl+O',
            click (item, focusedWindow) {
                const dialogOpts = {
                    properties: ['openFile'],
                    filters: [
                        {name: 'Docker-Compose-File', extensions: ['yml', 'yaml']}
                    ]
                };

                const files = dialog.showOpenDialog(dialogOpts);
                if(files && files.length === 1) {
                    focusedWindow.webContents.send('open-file', files[0]);
                }
            }
        },
        {
            type: 'separator'
        },
        {
            label: translate('menu.file.save.label'),
            accelerator: 'Ctrl+S'
        },
        {
            label: translate('menu.file.save_as.label') + '...'
        },
        {
            type: 'separator'
        },
        {
            label: translate('menu.file.export.label') + '...',
            accelerator: 'Ctrl+E'
        },
        {
            type: 'separator'
        },
        {
            role: 'quit'
        }
    ]
};