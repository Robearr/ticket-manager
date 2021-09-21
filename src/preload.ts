import dayjs from "dayjs";
import { contextBridge, ipcRenderer } from "electron";
import { existsSync, readFileSync } from "original-fs";
import { Ticket } from "./frontend/types/Ticket";

contextBridge.exposeInMainWorld('electron', {
  notificationApi: {
    saveTicket(message: Ticket) {
      ipcRenderer.send('save-ticket', message);
    },
    getWork(date?: Date) {
      const today = dayjs(date).format('YYYYMMDD');
      if (existsSync(`saves/temp${today}.json`)) {
        return readFileSync(`saves/temp${today}.json`, 'utf-8');
      } else {
        console.error('NEM LETEZIK FILE');
      }
    }
  }
})