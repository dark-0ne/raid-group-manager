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

    let classInputString = ""
    let classQuery = []
    if (document.getElementById("paladin-checkbox").checked) {
        classInputString += "Paladin"
        classQuery.push({
            "character_class": "Paladin"
        })
    }
    if (document.getElementById("warrior-checkbox").checked) {
        if (classInputString !== "") classInputString += " , "
        classInputString += "Warrior"
        classQuery.push({
            "character_class": "Warrior"
        })
    }
    if (document.getElementById("deathknight-checkbox").checked) {
        if (classInputString !== "") classInputString += " , "
        classInputString += "Death Knight"
        classQuery.push({
            "character_class": "Death Knight"
        })
    }
    if (document.getElementById("hunter-checkbox").checked) {
        if (classInputString !== "") classInputString += " , "
        classInputString += "Hunter"
        classQuery.push({
            "character_class": "Hunter"
        })
    }
    if (document.getElementById("shaman-checkbox").checked) {
        if (classInputString !== "") classInputString += " , "
        classInputString += "Shaman"
        classQuery.push({
            "character_class": "Shaman"
        })
    }
    if (document.getElementById("rogue-checkbox").checked) {
        if (classInputString !== "") classInputString += " , "
        classInputString += "Rogue"
        classQuery.push({
            "character_class": "Rogue"
        })
    }
    if (document.getElementById("druid-checkbox").checked) {
        if (classInputString !== "") classInputString += " , "
        classInputString += "Druid"
        classQuery.push({
            "character_class": "Druid"
        })
    }
    if (document.getElementById("mage-checkbox").checked) {
        if (classInputString !== "") classInputString += " , "
        classInputString += "Mage"
        classQuery.push({
            "character_class": "Mage"
        })
    }
    if (document.getElementById("warlock-checkbox").checked) {
        if (classInputString !== "") classInputString += " , "
        classInputString += "Warlock"
        classQuery.push({
            "character_class": "Warlock"
        })
    }
    if (document.getElementById("priest-checkbox").checked) {
        if (classInputString !== "") classInputString += " , "
        classInputString += "Priest"
        classQuery.push({
            "character_class": "Priest"
        })
    }

    document.getElementById("class-input").value = classInputString

    const searchString = document.getElementById("search-input").value
    if (searchString === "" && classQuery.length === 0) {
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
            "$and": [{
                "$or": [{
                    "discord_name": regexString
                }, {
                    "character_name": regexString
                }]
            }, {
                "$or": classQuery
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