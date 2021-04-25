const MongoClient = require('mongodb').MongoClient;
const fs = require("fs")

const {
    showAllRaids,
} = require("./scripts/showRaids.js")

const {
    ipcRenderer
} = require('electron')

const password = fs.readFileSync("credentials", "utf-8")

const uri = "mongodb+srv://rgm-electron-app:" + password + "@cluster0.o0xx5.mongodb.net/raid-group-manager?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

function returnToHome(){
    ipcRenderer.invoke("confirm-discard","index.html")
}

function returnToRaids(){
    ipcRenderer.invoke("confirm-discard","raids.html")
}