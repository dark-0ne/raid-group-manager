const MongoClient = require('mongodb').MongoClient;
const fs = require("fs")

const {
    showAllPlayers,
    showSearchPlayers
} = require("./scripts/showPlayers")

const {
    ipcRenderer
} = require('electron')

const password = fs.readFileSync("credentials", "utf-8")

const uri = "mongodb+srv://rgm-electron-app:" + password + "@cluster0.o0xx5.mongodb.net/raid-group-manager?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

function handleSearch(e) {
    const searchLoader = document.getElementById("search-loader")
    searchLoader.classList.remove("d-none")

    const searchString = document.getElementById("search-input").value
    if (searchString === "") {
        const player_col = client.db("raid-group-manager").collection("players");
        player_col.find({}).collation({
            'locale': 'en'
        }).sort({
            "discord_name": 1
        }).toArray((err, data) => {
            if (err) {
                console.log(err)
            } else {
                showAllPlayers(data);
            }
        })
    } else {
        const regexString = new RegExp(".*" + searchString + ".*", "i")

        const character_col = client.db("raid-group-manager").collection("characters");
        character_col.find({
            "$or": [{
                "discord_name": regexString
            }, {
                "character_name": regexString
            }]
        }).collation({
            'locale': 'en'
        }).sort({
            "discord_name": 1
        }).toArray((err, data) => {
            if (err) {
                console.log(err)
            } else {
                showSearchPlayers(data)
            }
        })
    }
    searchLoader.classList.add("d-none")
}

client.connect(err => {
    if (err) {
        ipcRenderer.invoke('show-login')
    } else {
        const player_col = client.db("raid-group-manager").collection("players");
        player_col.find({}).collation({
            'locale': 'en'
        }).sort({
            "discord_name": 1
        }).toArray((err, data) => {
            if (err) {
                console.log(err)
            } else {
                console.log(data)
                // Remove loader spinner
                const loader = document.getElementById("loader")
                loader.remove();

                showAllPlayers(data);
            }
        })
    }
});