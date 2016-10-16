const electron = require('electron');
const dialog = electron.dialog;
const _ = require('../i18n');
const fs = require('fs');
const path = require('path');
const Zip = require('node-zip');

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
                        {name: 'Docker-Compose-File', extensions: ['dce']}
                    ]
                };

                const files = dialog.showOpenDialog(dialogOpts);
                if(files && files.length === 1) {
                    const data = fs.readFileSync(files[0], 'binary');
                    var zip = new Zip(data, {base64: false, checkCRC32: true});
                    const file = zip.files['data.json'];
                    electron.app.currentProjectFile = files[0];
                    focusedWindow.webContents.send('open-file', JSON.parse(file.asText()));
                }
            }
        },
        {
            type: 'separator'
        },
        {
            label: _('menu.file.import.label'),
            accelerator: 'Ctrl+I',
            click(item, focusedWindow) {
                const dialogOpts = {
                    properties: ['openFile'],
                    filters: [
                        {name: 'Docker-Compose-File', extensions: ['yml', 'yaml']}
                    ]
                };

                const files = dialog.showOpenDialog(dialogOpts);
                if(files && files.length === 1) {
                    focusedWindow.webContents.send('import', files[0]);
                }
            }
        },
        {
            type: 'separator'
        },
        {
            label: _('menu.file.save.label'),
            accelerator: 'Ctrl+S',
            click(item, focusedWindow) {
                focusedWindow.webContents.send('save');
            }
        },
        // {
        //     label: _('menu.file.save_as.label') + '...',
        //     accelerator: 'Ctrl+Shift+S',
        //     click(item, focusedWindow) {
        //         focusedWindow.webContents.send('save-as');
        //     }
        // },
        {
            type: 'separator'
        },
        {
            label: _('menu.file.export.label'),
            submenu: [
                {
                    label: _('menu.file.export.compose.label'),
                    accelerator: 'Ctrl+E',
                    click(item, focusedWindow) {
                        focusedWindow.webContents.send('export');
                    }
                },
                // {
                //     label: _('menu.file.export.docker-run.label'),
                //     click(item, focusedWindow) {
                //         focusedWindow.webContents.send('export.docker-run');
                //     }
                // },
                {
                    label: _('menu.file.export.docker-service.label'),
                    click(item, focusedWindow) {
                        focusedWindow.webContents.send('export.docker-service');
                    }
                }
            ]
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
