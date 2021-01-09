const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
var PORT = process.env.PORT || 9000;
const mainDir = path.join(__dirname, "/public");

app.use(express.static('pubic'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.get("/notes", function(req, res){
    res.sendFile(path.joing(mainDir, "notes.html"));

});

app.get("/api/notes/:id", function(req, res) {
    let createdNotes = JSON.parse(fs.readFileSync("./Develop/db/db.json", "utf8"));
    res.json(createdNotes[Number(req.params.id)]);

});

app.get("*", function(req, res){
    res.sendFile(path.join(mainDir, "index.html"));

});

app.post("/api/notes". function(req, res) {
    let createdNotes = JSON.parse(fs.readFileSync("./Develop/db/db.json", "utf8"));
    
    
})

