const MongoClient = require('mongodb').MongoClient;
const fs = require("fs")

const { showPlayers } = require("./scripts/showPlayers")

const {
    ipcRenderer
} = require('electron')

const password = fs.readFileSync("credentials", "utf-8")

const uri = "mongodb+srv://rgm-electron-app:" + password + "@cluster0.o0xx5.mongodb.net/raid-group-manager?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

function handleSearch(e) {
    const searchLoader = document.getElementById("search-loader")
    searchLoader.classList.remove("d-none")
}

client.connect(err => {
    if (err) {
        ipcRenderer.invoke('show-login')
    } else {
        const player_col = client.db("raid-group-manager").collection("players");
        player_col.find({}).collation({
            'locale': 'en'
        }).sort({
            "discord_name": 1
        }).toArray((err, data) => {
            if (err) {
                console.log(err)
            } else {
                console.log(data)
                // Remove loader spinner
                const loader = document.getElementById("loader")
                loader.remove();
                
                showPlayers(data);

                client.close();
            }
        })
    }
});