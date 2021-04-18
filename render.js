const MongoClient = require('mongodb').MongoClient;
const fs = require("fs")

password_file = fs.readFileSync("credentials")
console.log(password_file)

const uri = "mongodb+srv://rgm-electron-app:<password>@cluster0.o0xx5.mongodb.net/raid-group-manager?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
const player_col = client.db("raid-group-manager").collection("players");
// perform actions on the collection object
client.close();
});