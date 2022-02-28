const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")

/* The userSchema is a mongoose schema that defines the structure of the user document.
The timestamps option is a mongoose plugin that adds createdAt and updatedAt fields to the schema.
The userSchema is then passed to the mongoose.model() function to create a model that can be used to
create new documents.
The model is then exported so that it can be used elsewhere */
const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
       /* This is defining the email field as a String type. This means that the value of this field
       can only be a string. */
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
      /* This is defining the isAdmin field as a Boolean type. This means that the value of this field
      can only be true or false. */
        isAdmin: {
            type: Boolean,
            required: true,
            default: false,
        },
        pic: {
            type: String,
            required: true,
            default: "https://cdn.pixabay.com/photo/2016/03/31/14/47/avatar-1292817_960_720.png"
        },
    },
    {
        // TIme stamps to see whent the note is created & when it was updated
        timestamps: true, 


    },
);

/* When a user is saved, if the password has been modified, hash the password and save it. */
/* If the password field has been modified, hash the password and save it to the database.*/

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next()
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt)
})

/* The method matchPassword() is a method on the userSchema. It takes in an argument of the entered
password. It then uses the bcrypt.compare() method to compare the entered password to the password
stored in the database.
The bcrypt.compare() method takes in two arguments: the entered password and the password stored in
the database. It returns a promise.
*/
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

/* The above code is creating a new model called User that uses the userSchema we created earlier. */
const User = mongoose.model("User", userSchema);

module.exports = User;