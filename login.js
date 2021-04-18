const fs = require("fs")
const login = document.getElementById("login-form")

login.addEventListener("submit", async (event) => {
    event.preventDefault()

    const password = document.getElementById("password-input").value

    fs.writeFileSync("credentials",password)
})