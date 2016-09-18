const {dialog, ipcMain} = require('electron');
const fs = require('fs');

module.exports = {
    label: 'File',
    submenu: [
        {
            label: 'Open...',
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
            label: "Save"
        },
        {
            label: "Save as..."
        },
        {
            type: 'separator'
        },
        {
            role: 'quit'
        }
    ]
};