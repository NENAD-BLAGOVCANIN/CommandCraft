const { app, BrowserWindow } = require('electron');
require('electron-reload')(__dirname);

function createWindow () {
  const win = new BrowserWindow({
    width: 900,
    height: 700,
    webPreferences: {
      nodeIntegration: true
    }
  });

  win.loadFile('./pages/home.html');

  win.on('closed', () => {
    win = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.activate = () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
};