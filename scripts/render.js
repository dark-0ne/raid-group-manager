const {
    ipcRenderer
} = require('electron')

function goToCharacters() {
    ipcRenderer.invoke('main-load-characters')
}

function goToRaids() {
    ipcRenderer.invoke('main-load-raids')
}

function exitApp() {
    ipcRenderer.invoke('exit-app')
}