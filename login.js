const fs = require("fs")
const {
    ipcRenderer
} = require('electron')
const MongoClient = require('mongodb').MongoClient;


const login = document.getElementById("login-form")

login.addEventListener("submit", async (event) => {
    event.preventDefault()

    const spinner = document.getElementById("loader")
    spinner.classList.remove("d-none")
    const password = document.getElementById("password-input").value
    const uri = "mongodb+srv://rgm-electron-app:" + password + "@cluster0.o0xx5.mongodb.net/raid-group-manager?retryWrites=true&w=majority";
    const client = new MongoClient(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    client.connect(err => {
        if (err) {
            document.getElementById("password-input").classList.add("is-invalid")
            document.getElementById("login-message").textContent = "Login unsuccessful, please try again."
            spinner.classList.add("d-none")
        } else {
            client.close();
            fs.writeFileSync("credentials", password)
            ipcRenderer.invoke('after-login')
        }
    });

})