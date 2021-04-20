function showAllPlayers(players) {
    // Create grid
    const mainContainer = document.createElement("div")
    mainContainer.id = "main-container"
    mainContainer.classList.add("container")
    mainContainer.classList.add("animate-bottom")
    document.body.appendChild(mainContainer)

    //Show navbar
    const navbar = document.getElementById("search-navbar")
    navbar.classList.remove("d-none")

    if (players.length === 0) return

    let counter = 1
    for (player of players) {
        const row = document.createElement("div")
        row.classList.add("row", "align-items-center", "border", "rounded", "bg-light", "py-1", "my-1", "character-row")
        mainContainer.appendChild(row)

        const player_counter = document.createElement("div")
        player_counter.classList.add("col-1")
        player_counter.textContent = counter++
        player_counter.classList.add("player-counter")
        row.appendChild(player_counter)

        const class_div = document.createElement("div")
        class_div.classList.add("col-1")
        const class_icon = document.createElement("img")
        class_icon.setAttribute("width", 40)
        class_icon.setAttribute("height", 40)
        switch (player.character_class) {
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

        const discord_name = document.createElement("div")
        discord_name.classList.add("col-3")
        discord_name.textContent = player.discord_name
        row.appendChild(discord_name)

        player.character_name = player.character_name.replace(/\W/g, "")
        const character_name = document.createElement("div")
        character_name.classList.add("col-2")
        character_name.textContent = player.character_name
        row.appendChild(character_name)

        const info = document.createElement("div")
        info.classList.add("col-3")
        info.textContent = player.info
        row.appendChild(info)

        const altBtnDiv = document.createElement("div")
        altBtnDiv.classList.add("col-1")
        const altBtn = document.createElement("button")
        altBtn.classList.add("btn", "btn-success", "btn-sm", "d-none", "px-3")
        altBtn.textContent = "Alts"
        altBtnDiv.appendChild(altBtn)
        row.appendChild(altBtnDiv)

        if (player.alts) {
            altBtn.classList.remove("d-none")
            altBtn.setAttribute("data-bs-toggle", "collapse")
            altBtn.setAttribute("data-bs-target", "#" + player.character_name + "-alts-collapse")
            altBtn.setAttribute("aria-expanded", "false")
            altBtn.setAttribute("aria-controls", "#" + player.character_name + "-alts-collapse")

            const altsCollapse = document.createElement("div")
            altsCollapse.classList.add("collapse", "container", "border", "rounded", "mx-1", "bg-light")
            altsCollapse.id = player.character_name + "-alts-collapse"


            for (alt of player.alts) {

                const altRow = document.createElement("div")
                altRow.classList.add("row", "align-items-center", "border-bottom", "border-top", "justify-items-end", "py-1", "my-1", "mx-1", "alt-row")

                const alt_counter = document.createElement("div")
                alt_counter.classList.add("col-1")
                altRow.appendChild(alt_counter)

                const alt_discord_name = document.createElement("div")
                alt_discord_name.classList.add("col-3")
                altRow.appendChild(alt_discord_name)

                const alt_class_div = document.createElement("div")
                alt_class_div.classList.add("col-1")
                const alt_class_icon = document.createElement("img")
                alt_class_icon.setAttribute("width", 30)
                alt_class_icon.setAttribute("height", 30)
                switch (alt.character_class) {
                    case "Warrior":
                        alt_class_icon.setAttribute("src", "media/images/01-Warrior.png")
                        altRow.classList.add("warrior-row")
                        break;
                    case "Paladin":
                        alt_class_icon.setAttribute("src", "media/images/02-Paladin.png")
                        altRow.classList.add("paladin-row")
                        break;
                    case "Death Knight":
                        alt_class_icon.setAttribute("src", "media/images/03-DeathKnight.png")
                        altRow.classList.add("death-knight-row")
                        break;
                    case "Hunter":
                        alt_class_icon.setAttribute("src", "media/images/04-Hunter.png")
                        altRow.classList.add("hunter-row")
                        break;
                    case "Shaman":
                        alt_class_icon.setAttribute("src", "media/images/05-Shaman.png")
                        altRow.classList.add("shaman-row")
                        break;
                    case "Rogue":
                        alt_class_icon.setAttribute("src", "media/images/06-Rogue.png")
                        altRow.classList.add("rogue-row")
                        break;
                    case "Druid":
                        alt_class_icon.setAttribute("src", "media/images/07-Druid.png")
                        altRow.classList.add("druid-row")
                        break;
                    case "Mage":
                        alt_class_icon.setAttribute("src", "media/images/08-Mage.png")
                        altRow.classList.add("mage-row")
                        break;
                    case "Warlock":
                        alt_class_icon.setAttribute("src", "media/images/09-Warlock.png")
                        altRow.classList.add("warlock-row")
                        break;
                    case "Priest":
                        alt_class_icon.setAttribute("src", "media/images/10-Priest.png")
                        altRow.classList.add("priest-row")
                        break;
                }
                alt_class_div.appendChild(alt_class_icon)
                altRow.appendChild(alt_class_div)

                alt.character_name = alt.character_name.replace(/\W/g, "")
                const alt_name = document.createElement("div")
                alt_name.classList.add("col-2")
                alt_name.textContent = alt.character_name
                altRow.appendChild(alt_name)

                const alt_info = document.createElement("div")
                alt_info.classList.add("col-3")
                alt_info.textContent = alt.info
                altRow.appendChild(alt_info)

                const altBtnDiv = document.createElement("div")
                altBtnDiv.classList.add("col-1")
                const altBtn = document.createElement("button")
                altBtn.classList.add("btn", "btn-primary", "btn-sm", "d-none", "px-3")
                altBtn.textContent = "Alts"
                altBtnDiv.appendChild(altBtn)
                altRow.appendChild(altBtnDiv)

                const alt_armory_div = document.createElement("div")
                alt_armory_div.classList.add("col-1")
                const alt_armory_button = document.createElement("button")
                alt_armory_button.classList.add("btn", "btn-primary", "btn-sm", "pr-1")
                alt_armory_button.textContent = "Armory"
                alt_armory_button.setAttribute('onclick', "ipcRenderer.invoke('open-armory','" + alt.armory_link + "')")
                alt_armory_div.appendChild(alt_armory_button)
                altRow.appendChild(alt_armory_div)

                altsCollapse.appendChild(altRow)
            }

            mainContainer.appendChild(altsCollapse)
        }

        const armory_div = document.createElement("div")
        armory_div.classList.add("col-1")
        const armory_button = document.createElement("button")
        armory_button.classList.add("btn", "btn-primary", "btn-sm")
        armory_button.textContent = "Armory"
        armory_button.setAttribute('onclick', "ipcRenderer.invoke('open-armory','" + player.armory_link + "')")
        armory_div.appendChild(armory_button)
        row.appendChild(armory_div)

    }
}

function showSearchPlayers(players) {

    document.getElementById("main-container").remove()

    // Create grid
    const mainContainer = document.createElement("div")
    mainContainer.id = "main-container"
    mainContainer.classList.add("container")
    mainContainer.classList.add("animate-bottom")
    document.body.appendChild(mainContainer)

    if (players.length === 0) return

    let counter = 1
    for (player of players) {
        const row = document.createElement("div")
        row.classList.add("row", "align-items-center", "border", "rounded", "bg-light", "py-1", "my-1", "character-row")
        mainContainer.appendChild(row)

        const player_counter = document.createElement("div")
        player_counter.classList.add("col-1")
        player_counter.textContent = counter++
        player_counter.classList.add("player-counter")
        row.appendChild(player_counter)

        const class_div = document.createElement("div")
        class_div.classList.add("col-1")
        const class_icon = document.createElement("img")
        class_icon.setAttribute("width", 40)
        class_icon.setAttribute("height", 40)
        switch (player.character_class) {
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

        const discord_name = document.createElement("div")
        discord_name.classList.add("col-3")
        discord_name.textContent = player.discord_name
        row.appendChild(discord_name)

        player.character_name = player.character_name.replace(/\W/g, "")
        const character_name = document.createElement("div")
        character_name.classList.add("col-2")
        character_name.textContent = player.character_name
        row.appendChild(character_name)

        const info = document.createElement("div")
        info.classList.add("col-3")
        info.textContent = player.info
        row.appendChild(info)

        const altStatusDiv = document.createElement("div")
        altStatusDiv.classList.add("col-1")
        altStatusDiv.classList.add("btn","btn-sm","pill-rounded","px-3")
        if (player.main === "Main") altStatusDiv.classList.add("btn-success")
        else altStatusDiv.classList.add("btn-warning")
        altStatusDiv.textContent = player.main 
        row.appendChild(altStatusDiv)

        const armory_div = document.createElement("div")
        armory_div.classList.add("col-1")
        const armory_button = document.createElement("button")
        armory_button.classList.add("btn", "btn-primary", "btn-sm")
        armory_button.textContent = "Armory"
        armory_button.setAttribute('onclick', "ipcRenderer.invoke('open-armory','" + player.armory_link + "')")
        armory_div.appendChild(armory_button)
        row.appendChild(armory_div)

    }
}


exports.showAllPlayers = showAllPlayers
exports.showSearchPlayers = showSearchPlayers