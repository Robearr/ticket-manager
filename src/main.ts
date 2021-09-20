import { app, BrowserWindow, session } from 'electron';
import path from 'path';
declare const MAIN_WINDOW_WEBPACK_ENTRY: string;

process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';

if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit();
}

const createWindow = (): void => {
  const mainWindow = new BrowserWindow({
    height: 600,
    width: 800,
  });

  mainWindow.webContents.session.webRequest.onHeadersReceived(
    { urls: ['*://*/*'] },
    (details, callback) => {
      Object.keys(details.responseHeaders).
        filter((x) => ['x-frame-options', 'content-security-policy'].includes(x.toLowerCase())).
        map((x) => delete details.responseHeaders[x])

      callback({
        cancel: false,
        responseHeaders: details.responseHeaders,
      })
    },
  );

  session.defaultSession.loadExtension(path.join(app.getAppPath(), `src/scripts/youtrack`), { allowFileAccess: true });

  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
  mainWindow.webContents.openDevTools();
};

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
