const asyncHandler = require("express-async-handler")
const User = require("../models/userModel");
const generateToken = require("../utils/generateToken");

/* The asyncHandler function is a wrapper function that takes in a callback
function and returns a function that can be used as a middleware. We are going to wrap this function inside of this async handler so this is going to handle all of the errors that are going to be in our application
*/
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password, pic } = req.body;
    /* The below code is checking if the user exists in the database. */
    const userExists = await User.findOne({ email })
    if (userExists) {
        res.status(400)
        throw new Error("User Already Exists")
    }

    const user = await User.create({
        name,
        email,
        password,
        pic,
    });

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            pic: user.pic,
            token: generateToken(user._id),
        })
    } else {
        res.status(400)
        throw new Error("Error Occured!")
    }


})

// for login
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            pic: user.pic,
            token: generateToken(user._id),
        });
    }
    else {
        res.status(400);
        throw new Error("Invalid Email or Password!")
    }
})

// updateUserProfile
const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.pic = req.body.pic || user.pic;

        if (req.body.password) {
            user.password = req.body.password;
        }

        const updatedUser = await user.save();


        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            pic: updatedUser.pic,
            token: generateToken(updatedUser._id),
        })
    } else {
        res.status(404)
        throw new Error("User not found!")
    }
});

module.exports = { registerUser, authUser, updateUserProfile };

