const express = require("express");
const { getNotes, createNote, getNotebyId, UpdateNote, DeleteNote } = require("../controllers/noteController");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();
/* This is registering a new route on the router object. */
// using get request to get all the routes from the backend
//read API 
router.route("/").get(protect, getNotes)
//create API
router.route("/create").post(protect, createNote)

router.route("/:id").get(getNotebyId).put(protect, UpdateNote).delete(protect, DeleteNote)
module.exports = router;