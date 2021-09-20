import dayjs from 'dayjs';
import { app, BrowserWindow, ipcMain, Notification, session } from 'electron';
import { writeFileSync } from 'original-fs';
import path from 'path';
import { Ticket } from './frontend/types/Ticket';
declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: any;

process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';

if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit();
}

const createWindow = (): void => {
  const mainWindow = new BrowserWindow({
    height: 600,
    width: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY
    }
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

  ipcMain.on('notify', (_, message: Ticket) => {
    console.log('got', message);

    const text = `${message.siteName}|${message.date}|${message.ticketNumber}-${message.ticketTitle}`;

    writeFileSync(`saves/temp${dayjs().format('YYYYMMDD')}.txt`, text);
  });

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
