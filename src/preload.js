// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
const { app, contextBridge, ipcRenderer } = require('electron');
const path = require('path');
const fs = require('fs');
const { homedir } = require('os');
const { pathToFileURL, fileURLToPath } = require('url');

const getDesktopOrHomeDir = () => {
    return path.resolve(homedir(), 'Desktop');
}

function loadFile(settingsPath) {
    return new Promise((resolve, reject) => {
        fs.readFile(pathToFileURL(settingsPath), function (err, data) {
            if (err) {
                //TODO gracefully let the user know
                console.log("Failed to read existing file");
                reject(err);
            }
            else {
                console.log("Success reading existing file");
                resolve(data.toString());
            }
        });
    });
}

contextBridge.exposeInMainWorld('electron', {
    saveSettingsFile: (settings, settingsPath) => {
        fs.writeFile(pathToFileURL(settingsPath), settings, function (err) {
            if (err) throw err;
            else console.log('Saved');
        })
    },
    loadSettingsFile: (settingsPath) => {
        return loadFile(settingsPath);
    }
});