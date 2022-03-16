// created this inside the config folder so that we keep DB files here

// import { connect } from "mongoose"
const mongoose = require("mongoose")

const connectDB = async () => {
    try {

        /* Connect to the MongoDB Atlas database using the Mongoose library via  MongoDB URI from the .env file. */
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true,
        })
        /* The above code is connecting to the MongoDB database. */
        console.log(`MongoDB connected ${conn.connection.host}`)
    }
    catch (error) {
        console.error(`Error: ${error.message}`)
        process.exit()
    }
}

module.exports = connectDB;