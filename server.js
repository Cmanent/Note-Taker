var express = require("express");
var path = require("path");
var fs = require("fs");
var app = express();
var PORT = process.env.PORT || 3000;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
var db;
fs.readFile("./db/db.json", "utf8", function(err,data){
    console.log(data)
    db = JSON.parse(data)
});

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"))
});
app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});


app.get("/api/notes", (req, res) => {
    console.log(db)
    return res.json(db)
});


app.post("/api/notes", (req, res) => {
    var newNote = req.body;
 // console.log(newNote);
    ///
    var lastId = db[db.length -1].id
    var id = lastId + 1

    var newObj={id, ...newNote}
   // console.log(db)
    // create an id
    // add the id to the note
    // then you push

    ////
    db.push(newObj);
    fs.writeFile("./db/db.json",JSON.stringify(db),function(err,data){
       console.log(err,data)
        res.json(db);
    });

});
app.delete("/api/notes/:id", (req, res) => {
    var id = parseInt(req.params.id);
    console.log(id);
    var dbTemp = []

    for (var i =0; i < db.length; i++){
      //  console.log("inside the loop", i)
        if (db[i].id !== id){
        //    console.log("inside the if: ", i )
            dbTemp.push(db[i])
        }
    }
   // console.log(dbTemp)
    db = dbTemp

      fs.writeFile("./db/db.json",JSON.stringify(db),function(err,data){
       console.log(err,data)
        res.json(db);
    });
});
app.listen(PORT, () => {
    console.log("App listening on http://localhost:" + PORT);
});