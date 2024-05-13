const mongoose = require("mongoose");
const blogModel = require("../model/blogModel");
const userModel = require("../model/userModel");


// GET ALL BLOGS
const getAllBlogs = async (req, res) => {
    try {
        const blogs = await blogModel.find({}).populate("user");

        return res.status(200).send({
            success: true,
            blogCount: blogs.length,
            message: "All Blogs",
            blogs
        });

    } catch (error) {
        console.log(error);
        return res.status(400).send({
            success: false,
            message: "Error in getting all blogs"
        })
    }
}

// GET SINGLE BLOG
const getBlogById = async (req, res) => {
    try {
        const { id } = req.params;
        const blog = await blogModel.findById(id);
        return res.status(200).send({
            success: true,
            message: "Get Single Blog",
            blog
        })
    } catch (error) {
        console.log(error);
        return res.status(400).send({
            success: false,
            message: "error in getting single blog"
        })
    }
}

// CREATE BLOG
const createBlogController = async (req, res) => {
    try {
        const { title, description, image, user } = req.body;
        console.log(user)

        if (!title || !description || !image || !user) {
            return res.status(400).send({
                success: false,
                message: "All fields are required"
            })
        }

        const checkUser = await userModel.findById(user);

        if (!checkUser) {
            return res.status(400).send({
                success: false,
                message: "User Not Found"
            })
        }


        const newBlog = await new blogModel({ title, description, image, user });

        checkUser.blogs.push(newBlog);
        await checkUser.save();

        await newBlog.save();

        return res.status(201).send({
            success: true,
            message: "New Blog added",
            newBlog
        })

    } catch (error) {
        console.log(error);
        return res.status(400).send({
            success: false,
            message: "Error in creating blog"
        })
    }
}


// UDPATE BLOG
const updateBlogController = async (req, res) => {
    try {
        const { id } = req.params;

        const blog = await blogModel.findByIdAndUpdate(id, { ...req.body }, { new: true });

        return res.status(200).send({
            success: true,
            message: "Blog Updated.",
            blog
        })

    } catch (error) {
        console.log(error);
        return res.status(400).send({
            success: false,
            message: "Error in udpating blog"
        })
    }
}

// DELETE BLOG 
const deleteBlogController = async (req, res) => {
    try {

        const { id } = req.params;
        const blog = await blogModel.findByIdAndDelete(id).populate("user");
        await blog.user.blogs.pull(blog);
        await blog.user.save();
        return res.status(200).send({
            success: true,
            message: "Blog Deleted",
        })

    } catch (error) {
        console.log(error);
        return res.status(400).send({
            success: false,
            message: "Error in Deleting Blog."
        })
    }
}


// GET || USER BLOG CONTROLLER
const userBlogController = async (req, res) => {
    try {
        const userBlog = await userModel.findById(req.params.id).populate("blogs");
        if (!userBlog) {
            return res.status(400).send({
                success: false,
                message: "User Blog Not Found!"
            })
        }

        return res.status(200).send({
            success: true,
            message: "User Blogs",
            userBlog
        })

    } catch (error) {
        console.log(error)
        return res.status(400).send({
            success: false,
            message: "Something Error in Getting user blogs"
        })
    }
}


module.exports = {
    getAllBlogs,
    getBlogById,
    createBlogController,
    updateBlogController,
    deleteBlogController,
    userBlogController
}