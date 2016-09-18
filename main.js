const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const client = require('electron-connect').client;
let mainWindow;

function createWindow () {
    require('./menu');

    mainWindow = new BrowserWindow({width: 800, height: 600});
    mainWindow.loadURL(`file://${__dirname}/dist/index.html`);
    mainWindow.on('closed', function () {
        mainWindow = null
    });
    mainWindow.webContents.openDevTools()
    // Connect to server process
    client.create(mainWindow);
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

