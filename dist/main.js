"use strict";
exports.__esModule = true;
var electron_1 = require("electron");
var path = require("path");
function createWindow() {
    var mainWindow = new electron_1.BrowserWindow();
    mainWindow.loadFile(path.join(__dirname, "../index.html"));
}
electron_1.app.on("ready", function () {
    createWindow();
});
//# sourceMappingURL=main.js.map