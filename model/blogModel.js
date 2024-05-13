const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Blog Title is required!"]
    },
    description: {
        type: String,
        required: [true, "description is required"]
    },
    image: {
        type: String,
        required: [true, "Blog image is required"]
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: [true, "User id is Required"]
    }
}, { timestamps: true });

const blogModel = new mongoose.model("Blog", blogSchema);

module.exports = blogModel;