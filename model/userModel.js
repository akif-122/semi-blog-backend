const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username is Required."]
    },
    email: {
        type: String,
        required: [true, "Email is Required."]
    },
    password: {
        type: String,
        required: [true, "Password is Required"]
    },
    blogs: [
        {
            type: mongoose.Types.ObjectId,
            ref: "Blog"
        }
    ]
});

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;