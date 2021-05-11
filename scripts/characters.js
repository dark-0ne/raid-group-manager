const MongoClient = require('mongodb').MongoClient;
const fs = require("fs")

const {
    showAllPlayers,
    showSearchPlayers
} = require("./scripts/showPlayers")

const {
    ipcRenderer
} = require('electron')

const client = new MongoClient(process.env.RGM_DB_URI, {
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

    let rankInputString = ""
    let rankQuery = []

    if (document.getElementById("raid-leader-checkbox").checked) {
        rankInputString += "Raid Leader"
        rankQuery.push({
            "guild_rank": "Raid Leader"
        })
    }

    if (document.getElementById("core-raider-checkbox").checked) {
        if (rankInputString !== "") rankInputString += " , "
        rankInputString += "Core Raider"
        rankQuery.push({
            "guild_rank": "Core Raider"
        })
    }

    if (document.getElementById("raider-checkbox").checked) {
        if (rankInputString !== "") rankInputString += " , "
        rankInputString += "Raider"
        rankQuery.push({
            "guild_rank": "Raider"
        })
    }

    if (document.getElementById("initiate-checkbox").checked) {
        if (rankInputString !== "") rankInputString += " , "
        rankInputString += "Initiate"
        rankQuery.push({
            "guild_rank": "Initiate"
        })
    }

    document.getElementById("rank-input").value = rankInputString

    const searchString = document.getElementById("search-input").value
    const regexString = new RegExp(".*" + searchString + ".*", "i")

    if (searchString === "" && classQuery.length === 0 && rankQuery.length === 0) {
        const player_col = client.db(process.env.RGM_DB_NAME).collection("players");
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
        let query = {
            "$and": [{
                "$or": [{
                    "discord_name": regexString
                }, {
                    "character_name": regexString
                }]
            }]
        };

        if (classQuery.length !== 0) {
            query["$and"].push({
                "$or": classQuery
            })
        }

        if (rankQuery.length !== 0) {
            query["$and"].push({
                "$or": rankQuery
            })
        }

        const character_col = client.db(process.env.RGM_DB_NAME).collection("characters");
        character_col.find(query).collation({
            'locale': 'en'
        }).sort({
            "discord_name": 1,
            "main": -1
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

        const player_col = client.db(process.env.RGM_DB_NAME).collection("players");
        player_col.find({}).collation({
            'locale': 'en'
        }).sort({
            "discord_name": 1
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

                showAllPlayers(data);
            }
        })
    }
});