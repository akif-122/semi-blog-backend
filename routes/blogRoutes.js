const express = require("express");
const { getAllBlogs, getBlogById, createBlogController, updateBlogController, deleteBlogController, userBlogController } = require("../controllers/blogController");

const router = express.Router();

// GET || GET ALL BLOGS
router.get("/all-blogs", getAllBlogs);

// GET || GET SINGLE BLOG
router.get("/get-blog/:id", getBlogById);

// POST || CREATE BLOG 
router.post("/create-blog", createBlogController);

// PUT || UPDATE BLOG
router.put("/update-blog/:id", updateBlogController);

// DELETE || DELETE BLOG

router.delete("/delete-blog/:id", deleteBlogController);


// GET || USER BLOGS
router.get("/user-blog/:id", userBlogController)


module.exports = router;