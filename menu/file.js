const electron = require('electron');
const dialog = electron.dialog;
const _ = require('../i18n');
const fs = require('fs');

module.exports = {
    label: _('menu.file.label'),
    submenu: [
        {
            label: _('menu.file.open.label') + '...',
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
            label: _('menu.file.save.label'),
            accelerator: 'Ctrl+S'
        },
        {
            label: _('menu.file.save_as.label') + '...',
            accelerator: 'Ctrl+Shift+S'
        },
        {
            type: 'separator'
        },
        {
            label: _('menu.file.export.label') + '...',
            accelerator: 'Ctrl+E'
        },
        {
            type: 'separator'
        },
        {
            label: _('menu.file.quit.label'),
            role: 'quit',
            accelerator: 'Ctrl+Q'
        }
    ]
};