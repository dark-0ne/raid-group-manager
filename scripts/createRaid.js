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

let raidTanks = [],
    raidHealers = [],
    raidDps = []

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

    ipcRenderer.invoke("create-add-to-raid-window", payload)
}

ipcRenderer.on("add-char-to-raid", (event, payload) => {
    //TODO: Add character name check
    payload.player.character_name = payload.player.character_name.replace(/\W/g, "")
    delete payload.player._id

    const query = "div.row.character-row[name='" + payload.player.character_name + "']"
    const prevRow = document.querySelector(query)
    if (prevRow) prevRow.remove()


    raidTanks = raidTanks.filter((value, index, arr) => {
        return payload.player.character_name !== value.character_name
    })
    raidHealers = raidHealers.filter((value, index, arr) => {
        return payload.player.character_name !== value.character_name
    })
    raidDps = raidDps.filter((value, index, arr) => {
        return payload.player.character_name !== value.character_name
    })

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
            raidTanks.push(payload.player)
            break

        case "healer":
            document.getElementById("healer-container").appendChild(row)
            raidHealers.push(payload.player)
            break

        case "dps":
            document.getElementById("dps-container").appendChild(row)
            raidDps.push(payload.player)
            break
    }

    const numberOfTanks = document.getElementById("tank-container").children.length
    document.getElementById("tank-counter").textContent = numberOfTanks - 1

    const numberOfHealers = document.getElementById("healer-container").children.length
    document.getElementById("healer-counter").textContent = numberOfHealers - 1

    const numberOfDPS = document.getElementById("dps-container").children.length
    document.getElementById("dps-counter").textContent = numberOfDPS - 1

})

function saveRaid() {
    const raidTitle = document.getElementById("raid-title")
    const alphanumericRegex = /^[a-z0-9]+$/i

    let validForm = true

    if (!alphanumericRegex.test(raidTitle.value)) {
        raidTitle.classList.add("is-invalid")
        validForm = false
    } else {
        raidTitle.classList.remove("is-invalid")
    }

    const raidDate = document.getElementById("raid-date")
    if (raidDate.value.length === 0) {
        raidDate.classList.add("is-invalid")
        validForm = false
    } else {
        raidDate.classList.remove("is-invalid")
    }

    let raidSize = document.getElementById("raid-size").value
    if (raidSize === "other") {
        const customRaidSize = document.getElementById("size-other")
        const numericRegex = /^[0-9]+$/i
        if (!numericRegex.test(customRaidSize.value)) {
            customRaidSize.classList.add("is-invalid")
            validForm = false
        } else {
            customRaidSize.classList.remove("is-invalid")
            raidSize = customRaidSize.value
        }
    }

    let raidInstance = document.getElementById("raid-instance").value
    if (raidInstance === "other") {
        const customRaidInstance = document.getElementById("instance-other")
        const alphaRegex = /^[a-z]+$/i
        if (!alphaRegex.test(customRaidInstance.value)) {
            customRaidInstance.classList.add("is-invalid")
            validForm = false
        } else {
            customRaidInstance.classList.remove("is-invalid")
            raidInstance = customRaidInstance.value
        }
    }

    if (!validForm) return

    raid = {
        _id: raidID,
        title: raidTitle.value,
        date: new Date(raidDate.value),
        size: raidSize,
        instance: raidInstance,
        notes: document.getElementById("raid-notes").value,
        dkp: document.getElementById("dkpCheckbox").checked,
        tanks: raidTanks,
        healers: raidHealers,
        dps: raidDps
    }

    console.log(raid)

    document.getElementById("save-loader").classList.remove("d-none")
    document.getElementById("save-result").classList.add("d-none")
    document.getElementById("save-btn").disabled = true
    client.connect(async (err) => {
        if (err) {
            ipcRenderer.invoke('show-login')
        } else {
            const raid_col = client.db("raid-group-manager").collection("raids");
            try {
                const result = await raid_col.insertOne(raid);
                document.getElementById("save-loader").classList.add("d-none")
                document.getElementById("save-result").classList.remove("d-none")

                const resultIcon = document.getElementById("result-icon")
                resultIcon.classList.remove("fa-times")
                resultIcon.classList.add("fa-check")
                resultIcon.style.color = "green"
                setTimeout(() => {  window.location.replace("raids.html"); }, 1000);

            } catch (err) {
                console.log(err)
                document.getElementById("save-btn").disabled = false

                document.getElementById("save-loader").classList.add("d-none")
                document.getElementById("save-result").classList.remove("d-none")

                const resultIcon = document.getElementById("result-icon")
                resultIcon.classList.remove("fa-check")
                resultIcon.classList.add("fa-times")
                resultIcon.style.color = "#a11b1b"
            }
        }
    })
}

const raidID = new ObjectID()
document.getElementById("raid-id").value = raidID
document.getElementById("breadcrumb-id").textContent = raidID