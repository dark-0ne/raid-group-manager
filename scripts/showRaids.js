function showAllRaids(raids) {

    // Remove previous container if exists
    const prevContainer = document.getElementById("main-container")
    if (prevContainer) prevContainer.remove()

    const coverContainer = document.getElementById("cover-container")

    if (raids.length === 0) {
        const emptyDiv = document.createElement("main")
        emptyDiv.classList.add("animate-bottom","mt-auto")

        const emptyHeader = document.createElement("h2")
        emptyHeader.textContent = "No raids to show"

        emptyDiv.appendChild(emptyHeader)
        coverContainer.appendChild(emptyDiv)

        const footer = document.createElement("footer")
        footer.classList.add("mt-auto")
        coverContainer.appendChild(footer)
        return
    }

    // Create grid
    const mainContainer = document.createElement("div")
    mainContainer.id = "main-container"
    mainContainer.classList.add("container")
    mainContainer.classList.add("animate-bottom")
    coverContainer.appendChild(mainContainer)

    let counter = 1
    for (raid of raids) {
        const row = document.createElement("div")
        row.classList.add("row", "align-items-center", "border", "rounded", "bg-light", "py-1", "my-1", "raid-row", "justify-content-start")
        mainContainer.appendChild(row)

        const raid_counter = document.createElement("div")
        raid_counter.classList.add("col-1")
        raid_counter.textContent = counter++
        row.appendChild(raid_counter)

        const title = document.createElement("div")
        title.classList.add("col-3")
        title.style.textAlign = "center";
        title.textContent = raid.title
        row.appendChild(title)

        const instanceDiv = document.createElement("div")
        instanceDiv.classList.add("col-1")
        const instancePill = document.createElement("span")
        instancePill.classList.add("badge")
        switch (raid.instance) {
            case "Icecrown Citadel":
                instancePill.classList.add("badge-icc")
                instancePill.textContent = "ICC"
                break;
            case "Ruby Sanctum":
                instancePill.classList.add("badge-rs")
                instancePill.textContent = "RS"
                break;
            case "Trial of the Crusader":
                instancePill.classList.add("badge-toc")
                instancePill.textContent = "TOC"
                break;
            default:
                instancePill.classList.add("badge-instance-other")
                instancePill.textContent = "Other"
                break;
        }
        instanceDiv.appendChild(instancePill)
        row.appendChild(instanceDiv)

        const sizeDiv = document.createElement("div")
        sizeDiv.classList.add("col-1")
        const sizePill = document.createElement("span")
        sizePill.classList.add("badge")
        sizePill.textContent = raid.size
        switch (raid.size) {
            case "10-man":
                sizePill.classList.add("badge-10man")
                break;
            case "25-man":
                sizePill.classList.add("badge-25man")
                break;
            default:
                sizePill.classList.add("badge-size-other")
                sizePill.textContent = "Other"
                break;
        }
        sizeDiv.appendChild(sizePill)
        row.appendChild(sizeDiv)

        const dkpDiv = document.createElement("div")
        dkpDiv.classList.add("col-1")
        const dkpPill = document.createElement("span")
        dkpPill.classList.add("badge")
        dkpPill.textContent = "DKP"
        dkpPill.classList.add("badge-dkp")
        dkpDiv.appendChild(dkpPill)
        row.appendChild(dkpDiv)

        const date = document.createElement("div")
        date.classList.add("col-3")
        date.style.textAlign = "center";
        date.textContent = raid.date.toDateString()
        row.appendChild(date)

        if (!raid.dkp) {
            dkpDiv.classList.add("d-none")
            date.classList.add("offset-1")

        const buttonDiv = document.createElement("div")
        buttonDiv.classList.add("col-2")
        const buttonGroup = document.createElement("div")
        buttonGroup.classList.add("btn-group", "mx-1")
        buttonGroup.setAttribute("role", "group")

        const viewButton = document.createElement("button")
        viewButton.setAttribute("type", "button")
        viewButton.setAttribute("onclick", "showRaid('"+ raid._id +"')")
        viewButton.classList.add("btn", "btn-outline-secondary","m-1","px-1")
        viewButton.setAttribute("data-bs-toggle", "tooltip")
        viewButton.setAttribute("data-bs-placement", "top")
        viewButton.setAttribute("title", "View Raid")
        const viewIcon = document.createElement("i")
        viewIcon.classList.add("fas", "fa-eye")

        const deleteButton = document.createElement("button")
        deleteButton.setAttribute("type", "button")
        deleteButton.setAttribute("onclick", "deleteRaid('"+ raid._id +"')")
        deleteButton.classList.add("btn", "btn-outline-danger","m-1")
        deleteButton.setAttribute("data-bs-toggle", "tooltip")
        deleteButton.setAttribute("data-bs-placement", "top")
        deleteButton.setAttribute("title", "Delete Raid")
        const deleteIcon = document.createElement("i")
        deleteIcon.classList.add("fas", "fa-trash-alt")

        viewButton.appendChild(viewIcon)
        deleteButton.appendChild(deleteIcon)
        buttonDiv.appendChild(viewButton)
        buttonDiv.appendChild(deleteButton)
        //buttonDiv.appendChild(buttonGroup)
        row.appendChild(buttonDiv)
        }
    }
    const footer = document.createElement("footer")
    footer.classList.add("mt-auto")
    coverContainer.appendChild(footer)
}

exports.showAllRaids = showAllRaids