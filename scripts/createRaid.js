const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const fs = require("fs")

const {
    ipcRenderer
} = require('electron')

const password = fs.readFileSync("credentials", "utf-8")

const uri = "mongodb+srv://rgm-electron-app:" + password + "@cluster0.o0xx5.mongodb.net/raid-group-manager?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

function returnToHome() {
    ipcRenderer.invoke("confirm-discard", "index.html")
}

function returnToRaids() {
    ipcRenderer.invoke("confirm-discard", "raids.html")
}

function handleSize(){
    const currentSize = document.getElementById("raid-size").value
    if (currentSize === "other"){
        document.getElementById("size-other-col").classList.remove("d-none")
    }
    else{
        document.getElementById("size-other-col").classList.add("d-none")
    }
}

function handleInstance(){
    const currentInstance = document.getElementById("raid-instance").value
    if (currentInstance === "other"){
        document.getElementById("instance-other-col").classList.remove("d-none")
    }
    else{
        document.getElementById("instance-other-col").classList.add("d-none")
    }
}

document.getElementById("raid-id").value = new ObjectID().toHexString()