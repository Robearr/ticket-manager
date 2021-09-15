import { app, BrowserWindow } from "electron";
import * as path from "path";

function createWindow() {
  const mainWindow = new BrowserWindow();

  mainWindow.loadFile(path.join(__dirname, "../index.html"));
}

app.on("ready", () => {
  createWindow();
});
