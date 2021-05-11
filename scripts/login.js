const fs = require("fs")
const {
    ipcRenderer
} = require('electron')
const MongoClient = require('mongodb').MongoClient;

const envfile = require('envfile')

const login = document.getElementById("login-form")

login.addEventListener("submit", async (event) => {
    event.preventDefault()

    const spinner = document.getElementById("loader")
    spinner.classList.remove("d-none")
    const password = document.getElementById("password-input").value
    const uri = "mongodb+srv://rgm-app-prod:" + password + "@cluster0.o0xx5.mongodb.net/raid-prod?retryWrites=true&w=majority";
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
            process.env.PROD_DB_PASSWORD = password

            let parsedFile = envfile.parse(fs.readFileSync(".env", "utf-8"))
            parsedFile.PROD_DB_PASSWORD = password
            fs.writeFileSync('./.env', envfile.stringify(parsedFile))
            client.close();
            ipcRenderer.invoke('after-login')
        }
    });

})