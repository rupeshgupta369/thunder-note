const express = require("express")
// const notes = require("./data/notes") //commenting this as we have a mongodb database instead of Mock database.
const dotenv = require("dotenv");
const connectDB = require("./congif/db")
const userRoutes = require("./routes/userRoutes");
const noteRoutes = require("./routes/noteRoutes");
const { notFound, errorHandler } = require("./middlewares/errorMiddlewares");
const path = require('path');

const app = express();
dotenv.config()
connectDB()

/* Connecting to the database and printing the result. */
// console.log(connectDB);
// app.get("/", (req, res) => {
//     res.send("API is running..")
// })

// app.get("/api/notes", (req, res) => {
//     res.json(notes)
// })
/* 
app.get("/api/notes/:id/:id2", (req, res) => {
    const note = notes.find(n => n._id === req.params.id)
    
    console.log(req.params); //if: api endpoint ="/api/notes/:id/:id2" o/p: { id: ':id', id2: ':id2' }
}) */

// app.get("/api/notes/:id", (req, res) => {
//     const note = notes.find((n) => n._id === req.params.id);
//     res.send(note);
// })


/* This is telling express to use the express.json() middleware. This middleware allows us to receive JSON data from the client. */
app.use(express.json())

// users Endpoint

app.use("/api/users", userRoutes)

/* notes endpoint */
app.use("/api/notes", noteRoutes)

// ------------------------deployment-------------------------------------
__dirname = path.resolve();
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/frontend_thunder-note/build')));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend_thunder-note', 'build', 'index.html'))
    })
} else {
    app.get("/", (req, res) => {
        res.send("API is running..")
    })
}

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on PORT ${PORT}`));