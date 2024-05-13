const mongoose = require("mongoose");

const ConnectDB = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Connection Successful!")
    } catch (error) {
        console.log(error)
    }
}

module.exports = ConnectDB;