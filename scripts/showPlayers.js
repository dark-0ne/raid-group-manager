function showPlayers(players) {
    // Remove previous container if exists
    const prevContainer = document.getElementById("main-container")
    if (prevContainer) prevContainer.remove()

    const prevFooter = document.getElementById("empty-footer")
    if (prevFooter) prevFooter.remove()

    const coverContainer = document.getElementById("cover-container")

    if (players.length === 0) {
        const emptyDiv = document.createElement("main")
        emptyDiv.classList.add("animate-bottom", "mt-auto")
        emptyDiv.id = "main-container"

        const emptyHeader = document.createElement("h2")
        emptyHeader.textContent = "No players to show"

        emptyDiv.appendChild(emptyHeader)
        coverContainer.appendChild(emptyDiv)

        const footer = document.createElement("footer")
        footer.classList.add("mt-auto")
        footer.id = "empty-footer"
        coverContainer.appendChild(footer)
        return
    }

    // Create grid
    const mainContainer = document.createElement("div")
    mainContainer.id = "main-container"
    mainContainer.classList.add("container")
    mainContainer.classList.add("animate-bottom")
    coverContainer.appendChild(mainContainer)

    // Create Header
    const row = document.createElement("div")
    row.classList.add("row", "align-items-center", "border", "rounded", "bg-light", "py-1", "my-1", "header-row", "justify-content-center")
    mainContainer.appendChild(row)

    const player_counter = document.createElement("div")
    player_counter.classList.add("col-1")
    player_counter.textContent = "#"
    player_counter.classList.add("player-counter")
    row.appendChild(player_counter)

    const guildRankDiv = document.createElement("div")
    guildRankDiv.classList.add("col-2")
    guildRankDiv.textContent = "Guild Rank"
    row.appendChild(guildRankDiv)

    const player_name = document.createElement("div")
    player_name.classList.add("col-3")
    player_name.style.textAlign = "center";
    player_name.textContent = "Player Name"
    row.appendChild(player_name)

    const current_dkp = document.createElement("div")
    current_dkp.classList.add("col-2")
    current_dkp.style.textAlign = "center";
    current_dkp.textContent = "Current DKP"
    row.appendChild(current_dkp)

    const total_dkp = document.createElement("div")
    total_dkp.classList.add("col-2")
    total_dkp.style.textAlign = "center";
    total_dkp.textContent = "Total DKP"
    row.appendChild(total_dkp)

    const buttonDiv = document.createElement("div")
    buttonDiv.classList.add("col-2")
    row.appendChild(buttonDiv)

    // Add a row for each entry
    let counter = 1
    for (player of players) {
        const row = document.createElement("div")
        row.classList.add("row", "align-items-center", "border", "rounded", "bg-light", "py-1", "my-1", "character-row", "justify-content-center")
        mainContainer.appendChild(row)

        const player_counter = document.createElement("div")
        player_counter.classList.add("col-1")
        player_counter.textContent = counter++
        player_counter.classList.add("player-counter")
        row.appendChild(player_counter)

        const guildRankDiv = document.createElement("div")
        guildRankDiv.classList.add("col-2")
        const guildRankPill = document.createElement("span")
        guildRankPill.classList.add("badge")
        switch (player.guild_rank) {
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
        guildRankPill.textContent = player.guild_rank
        guildRankDiv.appendChild(guildRankPill)
        row.appendChild(guildRankDiv)

        const player_name = document.createElement("div")
        player_name.classList.add("col-3")
        player_name.style.textAlign = "center";
        player_name.textContent = player.player_name
        row.appendChild(player_name)

        const current_dkp = document.createElement("div")
        current_dkp.classList.add("col-2")
        current_dkp.style.textAlign = "center";
        current_dkp.textContent = player.dkp.net
        row.appendChild(current_dkp)

        const total_dkp = document.createElement("div")
        total_dkp.classList.add("col-2")
        total_dkp.style.textAlign = "center";
        total_dkp.textContent = player.dkp.total
        row.appendChild(total_dkp)

        const buttonDiv = document.createElement("div")
        buttonDiv.classList.add("col-2")
        row.appendChild(buttonDiv)

        const viewButton = document.createElement("button")
        viewButton.setAttribute("type", "button")
        viewButton.setAttribute("onclick", "showPlayer('" + player._id + "')")
        viewButton.classList.add("btn", "btn-outline-secondary", "m-1", "px-1")
        viewButton.setAttribute("data-bs-toggle", "tooltip")
        viewButton.setAttribute("data-bs-placement", "top")
        viewButton.setAttribute("title", "View Raid")
        const viewIcon = document.createElement("i")
        viewIcon.classList.add("fas", "fa-eye")
        viewButton.appendChild(viewIcon)

        const deleteButton = document.createElement("button")
        deleteButton.setAttribute("type", "button")
        deleteButton.setAttribute("onclick", "deletePlayer('" + player._id + "')")
        deleteButton.classList.add("btn", "btn-outline-danger", "m-1")
        deleteButton.setAttribute("data-bs-toggle", "tooltip")
        deleteButton.setAttribute("data-bs-placement", "top")
        deleteButton.setAttribute("title", "Delete Raid")
        const deleteIcon = document.createElement("i")
        deleteIcon.classList.add("fas", "fa-trash-alt")
        deleteButton.appendChild(deleteIcon)

        buttonDiv.appendChild(viewButton)
        buttonDiv.appendChild(deleteButton)

        if (player.alts) {
            altBtn.classList.remove("d-none")
            altBtn.setAttribute("data-bs-toggle", "collapse")
            altBtn.setAttribute("data-bs-target", "#" + character.character_name + "-alts-collapse")
            altBtn.setAttribute("aria-expanded", "false")
            altBtn.setAttribute("aria-controls", "#" + character.character_name + "-alts-collapse")

            const altsCollapse = document.createElement("div")
            altsCollapse.classList.add("collapse", "container", "border", "rounded", "mx-1", "bg-light")
            altsCollapse.id = character.character_name + "-alts-collapse"


            for (alt of character.alts) {

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
    }
}

exports.showPlayers = showPlayers