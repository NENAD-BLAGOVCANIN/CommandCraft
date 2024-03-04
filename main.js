const { app, BrowserWindow } = require('electron');

let win; // Use let instead of const for win

function createWindow() {
  win = new BrowserWindow({
    width: 900,
    height: 700,
    webPreferences: {
      nodeIntegration: true
    }
  });

  win.loadFile('./pages/home.html');

  win.on('closed', () => {
    win = null; // Set win to null instead of redeclaring it with const
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
