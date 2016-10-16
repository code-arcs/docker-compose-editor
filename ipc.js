const fs = require('fs');
const Zip = require('node-zip');
const electron = require('electron');
const ipcMain = electron.ipcMain;
const dialog = electron.dialog;

ipcMain.on('export-data', function (event, yamlContent) {
    const dialogOpts = {
        filters: [
            {name: 'Docker-Compose-File', extensions: ['yml', 'yaml']}
        ]
    };
    const file = dialog.showSaveDialog(dialogOpts);
    if (file) {
        fs.writeFileSync(file, yamlContent, 'utf8');
    }
});

ipcMain.on('export.docker-service', function (event, data) {
    const dialogOpts = {
        filters: [
            {name: 'Bash-Script', extensions: ['sh']}
        ]
    };
    const file = dialog.showSaveDialog(dialogOpts);
    if (file) {
        fs.writeFileSync(file, data, 'utf8');
    }
});

ipcMain.on('save-data', function (event, data) {
    const dialogOpts = {
        filters: [
            {name: 'DCE-Project', extensions: ['dce']}
        ]
    };

    if (!electron.app.currentProjectFile) {
        electron.app.currentProjectFile = dialog.showSaveDialog(dialogOpts);
    }

    if (electron.app.currentProjectFile) {
        const zip = new Zip();
        zip.file('data.json', data);
        const zippedData = zip.generate({base64: false, compression: 'DEFLATE'});
        fs.writeFileSync(electron.app.currentProjectFile, zippedData, 'binary');
    }
});
