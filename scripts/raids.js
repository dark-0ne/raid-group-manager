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

client.connect(err => {
    if (err) {
        ipcRenderer.invoke('show-login')
    } else {
        const raid_col = client.db("raid-group-manager").collection("raids");
        raid_col.find({}).collation({
            'locale': 'en'
        }).toArray((err, data) => {
            if (err) {
                console.log(err)
            } else {
                //Show navbar
                const navbar = document.getElementById("search-navbar")
                navbar.classList.remove("d-none")

                console.log(data)
                // Remove loader spinner
                const loader = document.getElementById("loader")
                loader.remove();

                showAllRaids(data);
            }
        })
    }
});