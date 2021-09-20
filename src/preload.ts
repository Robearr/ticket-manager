import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld('electron', {
  notificationApi: {
    sendNotification(message: string) {
      ipcRenderer.send('notify', message);
    }
  }
})