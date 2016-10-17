const electron = require('electron');
const app = electron.app;

const client = require('electron-connect').client;
const BrowserWindow = electron.BrowserWindow;
let mainWindow;

function createWindow () {
    require('./ipc');
    require('./menu');

    mainWindow = new BrowserWindow({width: 1024, height: 768, icon: __dirname + '/icon.png'});
    mainWindow.loadURL(`file://${__dirname}/dist/index.html`);
    mainWindow.on('closed', function () {
        mainWindow = null
    });

    if(process.env.DCE_DEBUG === "true") {
        mainWindow.webContents.openDevTools();
        // Connect to server process
        client.create(mainWindow);
    }
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



