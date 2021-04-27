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

function handleSize() {
    const currentSize = document.getElementById("raid-size").value
    if (currentSize === "other") {
        document.getElementById("size-other-col").classList.remove("d-none")
    } else {
        document.getElementById("size-other-col").classList.add("d-none")
    }
}

function handleInstance() {
    const currentInstance = document.getElementById("raid-instance").value
    if (currentInstance === "other") {
        document.getElementById("instance-other-col").classList.remove("d-none")
    } else {
        document.getElementById("instance-other-col").classList.add("d-none")
    }
}

function handleAddChar() {

    let tanks = new Set(),
        healers = new Set(),
        dps = new Set
    var rows = document.getElementById("tank-container").children

    for (character of rows) {
        if (character.getAttribute("name")) tanks.add(character.getAttribute("name"))
    }

    rows = document.getElementById("healer-container").children
    for (character of rows) {
        if (character.getAttribute("name")) healers.add(character.getAttribute("name"))
    }

    rows = document.getElementById("dps-container").children
    for (character of rows) {
        if (character.getAttribute("name")) dps.add(character.getAttribute("name"))
    }

    payload = {
        tanks: tanks,
        healers: healers,
        dps: dps
    }

    ipcRenderer.invoke("create-add-to-raid-window",payload)
}

ipcRenderer.on("add-char-to-raid", (event, payload) => {
    //TODO: Add character name check
    payload.player.character_name = payload.player.character_name.replace(/\W/g, "")

    const query = "div.row.character-row[name='" + payload.player.character_name + "']"
    const prevRow = document.querySelector(query)
    if (prevRow) prevRow.remove()

    if (payload.role === "none") {
        const numberOfTanks = document.getElementById("tank-container").children.length
        document.getElementById("tank-counter").textContent = numberOfTanks - 1

        const numberOfHealers = document.getElementById("healer-container").children.length
        document.getElementById("healer-counter").textContent = numberOfHealers - 1

        const numberOfDPS = document.getElementById("dps-container").children.length
        document.getElementById("dps-counter").textContent = numberOfDPS - 1

        return
    }
    const row = document.createElement("div")
    row.classList.add("row", "align-items-center", "py-1", "my-1", "character-row")
    row.setAttribute("name", payload.player.character_name)

    const class_div = document.createElement("div")
    class_div.classList.add("col-2")
    const class_icon = document.createElement("img")
    class_icon.setAttribute("width", 30)
    class_icon.setAttribute("height", 30)
    switch (payload.player.character_class) {
        case "Warrior":
            class_icon.setAttribute("src", "media/images/01-Warrior.png")
            row.classList.add("warrior-row")
            break;
        case "Paladin":
            class_icon.setAttribute("src", "media/images/02-Paladin.png")
            row.classList.add("paladin-row")
            break;
        case "Death Knight":
            class_icon.setAttribute("src", "media/images/03-DeathKnight.png")
            row.classList.add("death-knight-row")
            break;
        case "Hunter":
            class_icon.setAttribute("src", "media/images/04-Hunter.png")
            row.classList.add("hunter-row")
            break;
        case "Shaman":
            class_icon.setAttribute("src", "media/images/05-Shaman.png")
            row.classList.add("shaman-row")
            break;
        case "Rogue":
            class_icon.setAttribute("src", "media/images/06-Rogue.png")
            row.classList.add("rogue-row")
            break;
        case "Druid":
            class_icon.setAttribute("src", "media/images/07-Druid.png")
            row.classList.add("druid-row")
            break;
        case "Mage":
            class_icon.setAttribute("src", "media/images/08-Mage.png")
            row.classList.add("mage-row")
            break;
        case "Warlock":
            class_icon.setAttribute("src", "media/images/09-Warlock.png")
            row.classList.add("warlock-row")
            break;
        case "Priest":
            class_icon.setAttribute("src", "media/images/10-Priest.png")
            row.classList.add("priest-row")
            break;
    }
    class_div.appendChild(class_icon)
    row.appendChild(class_div)

    const guildRankDiv = document.createElement("div")
    guildRankDiv.classList.add("col-2")
    const guildRankPill = document.createElement("span")
    guildRankPill.classList.add("badge")
    switch (payload.player.guild_rank) {
        case "Raid Leader":
            guildRankPill.classList.add("badge-raid-leader")
            break;
        case "Core Raider":
            guildRankPill.classList.add("badge-core-raider")
            break;
        case "Raider":
            guildRankPill.classList.add("badge-raider")
            break;
        case "Initiate":
            guildRankPill.classList.add("badge-initiate")
            break;
    }
    guildRankPill.textContent = payload.player.guild_rank
    guildRankDiv.appendChild(guildRankPill)
    row.appendChild(guildRankDiv)

    const character_name = document.createElement("div")
    character_name.classList.add("col-8")
    character_name.style.textAlign = "center"
    character_name.textContent = payload.player.character_name
    row.appendChild(character_name)

    switch (payload.role) {
        case "tank":
            document.getElementById("tank-container").appendChild(row)
            break

        case "healer":
            document.getElementById("healer-container").appendChild(row)
            break

        case "dps":
            document.getElementById("dps-container").appendChild(row)
            break
    }

    const numberOfTanks = document.getElementById("tank-container").children.length
    document.getElementById("tank-counter").textContent = numberOfTanks - 1

    const numberOfHealers = document.getElementById("healer-container").children.length
    document.getElementById("healer-counter").textContent = numberOfHealers - 1

    const numberOfDPS = document.getElementById("dps-container").children.length
    document.getElementById("dps-counter").textContent = numberOfDPS - 1

})

const raidID = new ObjectID().toHexString()
document.getElementById("raid-id").value = raidID
document.getElementById("breadcrumb-id").textContent = raidID