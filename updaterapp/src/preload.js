// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
const { app, contextBridge } = require('electron');
const path = require('path');
const fs = require('fs');
const { homedir } = require('os');

const getDesktopOrHomeDir = () => {
    return path.resolve(homedir(), 'Desktop');
  }

contextBridge.exposeInMainWorld('electron', {
    saveSettingsFile: (settings) => {
        fs.writeFile(path.join(getDesktopOrHomeDir(), '/streamcontrol.json'),settings, function (err) {
            if(err) throw err;
            else console.log('Saved');
        })
    }
});