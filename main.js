const electron = require('electron');
const app = electron.app;
const dialog = electron.dialog;

const ipcMain = electron.ipcMain;
const BrowserWindow = electron.BrowserWindow;
const client = require('electron-connect').client;
let mainWindow;

function createWindow () {
    require('./menu');

    mainWindow = new BrowserWindow({width: 1024, height: 768});
    mainWindow.loadURL(`file://${__dirname}/dist/index.html`);
    mainWindow.on('closed', function () {
        mainWindow = null
    });
    mainWindow.webContents.openDevTools();
    // Connect to server process
    client.create(mainWindow);

    ipcMain.on('export-data', function(event, yamlContent) {
        const dialogOpts = {
            filters: [
                {name: 'Docker-Compose-File', extensions: ['yml', 'yaml']}
            ]
        };
        const file = dialog.showSaveDialog(dialogOpts);
        if(file) {
            fs.writeFileSync(file, yamlContent, 'utf8');
        }
    });
}

app.on('ready', createWindow);
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
});

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow()
    }
});



