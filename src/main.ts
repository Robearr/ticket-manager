import dayjs from 'dayjs';
import { app, BrowserWindow, ipcMain, session } from 'electron';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'original-fs';
import path from 'path';
import { Ticket } from './frontend/types/Ticket';

declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: any;

process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';

if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit();
}

const createWindow = (): void => {

  if (!existsSync('./saves')) {
    mkdirSync('./saves');
  }

  const mainWindow = new BrowserWindow({
    height: 600,
    width: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY
    },
    icon: path.join(app.getAppPath(), '.webpack/renderer/main_window/assets/images/arpy.png')
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

  ipcMain.on('save-ticket', (_, message: Ticket) => {
    const today = dayjs().format('YYYYMMDD');

    if (!existsSync(`saves/temp${today}.json`)) {
      writeFileSync(`saves/temp${today}.json`, '[]');
    }

    const savedData: Ticket[] = JSON.parse(readFileSync(`./saves/temp${today}.json`, 'utf-8'));
    const newTicketIndex = savedData.findIndex(
      (ticket: Ticket) => ticket.ticketNumber === message.ticketNumber
    );

    if (newTicketIndex !== -1) {
      if (!savedData[newTicketIndex].isDone && message.isDone) {
        savedData[newTicketIndex].hours = Math.ceil(dayjs().diff(dayjs(savedData[newTicketIndex].startTime), 'minutes') / 60.0)
        savedData[newTicketIndex].isDone = true;
      }
    } else {
      savedData.push(message);
    }

    writeFileSync(`saves/temp${today}.json`, JSON.stringify(savedData));
  });

  ipcMain.on('handle-history-event', (_, direction: string) => {
    if (direction === 'back') {
      mainWindow.webContents.goBack();
    } else if (direction === 'forward') {
      mainWindow.webContents.goForward();
    }
  });

  session.defaultSession.loadExtension(path.join(app.getAppPath(), `.webpack/renderer/main_window/src/scripts/arpy-enhance`), { allowFileAccess: true });

  session.defaultSession.loadExtension(path.join(app.getAppPath(), `.webpack/renderer/main_window/src/scripts/youtrack`), { allowFileAccess: true });
  session.defaultSession.loadExtension(path.join(app.getAppPath(), `.webpack/renderer/main_window/src/scripts/arpy`), { allowFileAccess: true });
  session.defaultSession.loadExtension(path.join(app.getAppPath(), `.webpack/renderer/main_window/src/scripts/redmine`), { allowFileAccess: true });

  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
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
