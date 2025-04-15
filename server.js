const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");
const path = require("path");
const {set, ref} = require("firebase/database");
const {client, db} = require("./src/index.js");
require('dotenv').config();

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());



app.get("/data", (req, res) => {
    fs.readdir("./Data", (err, files) => {
        if(err) {
            console.error("Error Reading From the Data Directory", err);
            return res.status(500).send("Internal Server Error");
        }

        // Finds all the json files within the data directory
        const allFiles = files.filter(file => file.endsWith(".json")).map(file => path.basename(file, ".json"));
        let data = [];
        allFiles.forEach(element => {
            const fileContent = fs.readFileSync(`Data/${element}.json`);
            if(fileContent != "")
            {
                data += `${element} ${fileContent}`;
            }
        }); 
        res.send(data);
    })
})

app.put("/send", (req, res) => {
    console.log(req.body);
    set(ref(db, "/"), req.body); 
    res.status(200).send({"message": "updating data on the database"});
});

client.login(process.env.CLIENT_TOKEN)

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`)
});
