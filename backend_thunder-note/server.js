const express = require("express")
// const notes = require("./data/notes") //commenting this as we have a mongodb database instead of Mock database.
const dotenv = require("dotenv");
const connectDB = require("./congif/db")
const userRoutes = require("./routes/userRoutes");
const noteRoutes = require("./routes/noteRoutes");
const { notFound, errorHandler } = require("./middlewares/errorMiddlewares");

const app = express();
dotenv.config()
connectDB()

/* Connecting to the database and printing the result. */
// console.log(connectDB);
app.get("/", (req, res) => {
    res.send("API is running..")
})

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


/* This is telling express to use the express.json() middleware. This middleware allows us to receive
JSON data from the client. */
app.use(express.json())

/* This is the code that is telling the server to use the userRoutes.js file when the user goes to the
/api/users route. */
app.use("/api/users", userRoutes)
/* This is telling the server to use the noteRoutes.js file when the user goes to the /api/notes route. */
app.use("/api/notes", noteRoutes)

app.use(notFound)
app.use(errorHandler)

// console.log(process.env.PORT)
const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on PORT ${PORT}`));