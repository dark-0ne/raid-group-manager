const {
    ipcRenderer
} = require('electron')

function goToCharacters() {
    ipcRenderer.invoke('main-load-characters')
}

function exitApp() {
    ipcRenderer.invoke('exit-app')
}