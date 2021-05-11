const {
    ipcRenderer
} = require('electron')

function exitApp() {
    ipcRenderer.invoke('exit-app')
}