function showAllRaids(raids) {

    // Remove previous container if exists
    const prevContainer = document.getElementById("main-container")
    if (prevContainer) prevContainer.remove()

    //Show navbar
    const navbar = document.getElementById("search-navbar")
    navbar.classList.remove("d-none")

    if (raids.length === 0) {
        const coverContainer = document.getElementById("cover-container")
        const emptyDiv = document.createElement("main")
        //emptyDiv.classList.add("")
        //emptyDiv.id = "empty-div"

        const emptyHeader = document.createElement("h2")
        //emptyHeader.classList.add("my-auto")
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
    document.body.appendChild(mainContainer)

    for (raid of raids) {

    }
}

exports.showAllRaids = showAllRaids