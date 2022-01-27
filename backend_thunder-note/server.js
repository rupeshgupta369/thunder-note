const express = require("express")
const notes = require("./data/notes")
// const dotenv = require("dotenv").config()
const dotenv = require('dotenv').config()

const app = express();
// dotenv.config();

app.get("/", (req, res) => {
    res.send("API is running..")
})

app.get("/api/notes", (req, res) => {
    res.json(notes)
})
/* 
app.get("/api/notes/:id/:id2", (req, res) => {
    const note = notes.find(n => n._id === req.params.id)

    console.log(req.params); //if: api endpoint ="/api/notes/:id/:id2" o/p: { id: ':id', id2: ':id2' }
}) */

app.get("/api/notes/:id", (req, res) => {
    const note = notes.find((n) => n._id === req.params.id);
    res.send(note);
})

const PORT = process.env.PORT ;

app.listen(PORT, console.log(`Server started on PORT ${PORT}`))
// app.listen(5000, console.log("Server started on port 5000"))