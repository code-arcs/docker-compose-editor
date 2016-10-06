const fs = require('fs');
const Archiver = require('archiver');
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

ipcMain.on('save-data', function (event, data) {
    const dialogOpts = {
        filters: [
            {name: 'DCE-Project', extensions: ['dce']}
        ]
    };

    if(!electron.app.currenProjectFile) {
        electron.app.currenProjectFile = dialog.showSaveDialog(dialogOpts);
    }

    if(electron.app.currenProjectFile) {
        const archive = Archiver('zip');
        archive.on('error', function (err) {
            console.log(err);
        });
        archive.pipe(fs.createWriteStream(electron.app.currenProjectFile));
        archive.append(new Buffer(data), {name: 'data.json'});
        archive.finalize();
    }
});
