const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
var PORT = process.env.PORT || 9000;
const mainDir = path.join(__dirname, "/public");
// const newDB = JSON.parse(fs.readFileSync("./Develop/db/db.json", "utf-8"))

app.use(express.static('pubic'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

//GET routes 
app.get("/notes", function(req, res){
    res.sendFile(path.join(mainDir, "notes.html"));

});

app.get("/api/notes/:id", function(req, res) {
    let createdNotes = JSON.parse(fs.readFileSync("./Develop/db/db.json", "utf8"));
    res.json(createdNotes[Number(req.params.id)]);

});

app.get("*", function(req, res){
    res.sendFile(path.join(mainDir, "index.html"));

});
// POST routes 
app.post("/api/notes", function(req, res) {
    let createdNotes = JSON.parse(fs.readFileSync("./Develop/db/db.json", "utf8"));
    let newNote = req.body;
    let noteId = (createdNotes.length).toString();
    newNote.id = noteId;
    createdNotes.push(newNote);

    fs.writeFileSync("./Develop/db/db.json", JSON.stringify(createdNotes));
    console.log("Note saved to db.json File as: ", newNote);
    res.json(createdNotes);
})
//DELETE routes 
app.delete("/api/notes/:id", function(req, res){
    let createdNotes = JSON.parse(fs.readFileSync(".Develop/db/db.json", "utf8"));
    let noteId = req.params.id;
    let newID = 0;
    console.log(`ID ${noteId} has been deleted`);
    createdNotes = createdNotes.filter(curretNote => {
        return curretNote.id != noteId;
    })

    for (curretNote of createdNotes) {
        curretNote.id = newID.toString();
        newID++;
    }

    fs.readFileSync(".Develop/db/db.json", JSON.stringify(createdNotes));
    res.json(createdNotes);
})

app.listen(PORT, function() {
    console.log(`Currently listening to port ${PORT}.`);
})