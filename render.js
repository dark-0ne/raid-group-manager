const MongoClient = require('mongodb').MongoClient;
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
client.connect(err => {
    if (err) {
        ipcRenderer.invoke('show-login')
    } else {
        const player_col = client.db("raid-group-manager").collection("players");
        player_col.find({}).toArray((err, data) => {
            if (err) {
                console.log(err)
            } else {
                console.log(data)
                // Remove loader spinner
                const loader = document.getElementById("loader")
                loader.remove()

                // Create grid
                const mainContainer = document.createElement("div")
                mainContainer.classList.add("container")
                mainContainer.classList.add("animate-bottom")
                document.body.appendChild(mainContainer)

                let counter = 1
                for (player of data) {
                    const row = document.createElement("div")
                    row.classList.add("row")
                    row.classList.add("align-items-center")

                    const player_counter = document.createElement("div")
                    player_counter.classList.add("col-1")
                    player_counter.textContent = counter++
                    row.appendChild(player_counter)

                    const class_div = document.createElement("div")
                    class_div.classList.add("col-1")
                    const class_icon = document.createElement("img")
                    class_icon.setAttribute("width",40)
                    class_icon.setAttribute("height",40)
                    switch (player.character_class) {
                        case "Warrior":
                            class_icon.setAttribute("src", "media/images/01-Warrior.png")
                            break;
                        case "Paladin":
                            class_icon.setAttribute("src", "media/images/02-Paladin.png")
                            break;
                        case "Death Knight":
                            class_icon.setAttribute("src", "media/images/03-DeathKnight.png")
                            break;
                        case "Hunter":
                            class_icon.setAttribute("src", "media/images/04-Hunter.png")
                            break;
                        case "Shaman":
                            class_icon.setAttribute("src", "media/images/05-Shaman.png")
                            break;
                        case "Rogue":
                            class_icon.setAttribute("src", "media/images/06-Rogue.png")
                            break;
                        case "Druid":
                            class_icon.setAttribute("src", "media/images/07-Druid.png")
                            break;
                        case "Mage":
                            class_icon.setAttribute("src", "media/images/08-Mage.png")
                            break;
                        case "Warlock":
                            class_icon.setAttribute("src", "media/images/09-Warlock.png")
                            break;
                        case "Priest":
                            class_icon.setAttribute("src", "media/images/10-Priest.png")
                            break;
                    }
                    class_div.appendChild(class_icon)
                    row.appendChild(class_div)

                    const discord_name = document.createElement("div")
                    discord_name.classList.add("col-3")
                    discord_name.textContent = player.discord_name
                    row.appendChild(discord_name)

                    const character_name = document.createElement("div")
                    character_name.classList.add("col-2")
                    character_name.textContent = player.character_name
                    row.appendChild(character_name)

                    const info = document.createElement("div")
                    info.classList.add("col-4")
                    info.textContent = player.info
                    row.appendChild(info)

                    const armory_div = document.createElement("div")
                    armory_div.classList.add("col-1")
                    const armory_button = document.createElement("button")
                    armory_button.classList.add("btn")
                    armory_button.classList.add("btn-primary")
                    armory_button.textContent = "Armory"
                    armory_button.setAttribute('onclick', "ipcRenderer.invoke('open-armory','" + player.armory_link + "')")
                    armory_div.appendChild(armory_button)
                    row.appendChild(armory_div)

                    mainContainer.appendChild(row)
                }
                client.close();
            }
        })
    }
});