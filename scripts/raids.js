const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const fs = require("fs")

const {
    showAllRaids,
} = require("./scripts/showRaids.js")

const {
    ipcRenderer
} = require('electron')

const client = new MongoClient(process.env.RGM_DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

client.connect(err => {
    if (err) {
        console.log(err)
        //ipcRenderer.invoke('show-login')
    } else {
        const raid_col = client.db(process.env.RGM_DB_NAME).collection("raids");
        raid_col.find({}).collation({
            'locale': 'en'
        }).toArray((err, data) => {
            if (err) {
                console.log(err)
            } else {
                //Show navbar
                const navbar = document.getElementById("search-navbar")
                navbar.classList.remove("d-none")

                // Remove loader spinner
                const loader = document.getElementById("loader")
                loader.remove();

                showAllRaids(data);
            }
        })
    }
});

function deleteRaid(raidID) {
    client.connect(err => {
        if (err) {
            ipcRenderer.invoke('show-login')
        } else {
            const raid_col = client.db(process.env.RGM_DB_NAME).collection("raids");
            raid_col.deleteOne({
                _id: new ObjectID(raidID)
            }, (err) => {
                if (err) {
                    console.log(err)
                } else {
                    location.reload()
                }
            })
        }
    });
}

function showRaid(raidID) {
    window.location.replace("editRaid.html?q="+raidID);
}