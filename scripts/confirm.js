const {
    ipcRenderer
} = require('electron')

let returnAddress 

ipcRenderer.on("return-address",(event,address)=>{
    returnAddress = address
    document.getElementById("yes-button").disabled = false
})

function handleNo(){
    window.close()
}

function handleYes(){
    ipcRenderer.invoke('discard-confirmed',returnAddress)
    window.close()
}