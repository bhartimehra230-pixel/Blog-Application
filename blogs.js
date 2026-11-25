
const express = require("express");
const router = express.Router();

let blogs = [];

// CREATE BLOG API
router.post("/create", (req, res) => {
    const { title, category, image, content } = req.body;

    if (!title || !category || !content) {
        return res.status(400).json({
            success: false,
            message: "Please fill all required fields"
        });
    }

    const newBlog = {
        id: Date.now(),
        title,
        category,
        image: image || "",
        content,
        date: new Date().toLocaleDateString()
    };

    blogs.push(newBlog);

    res.status(201).json({
        success: true,
        message: "Blog created successfully!",
        blog: newBlog
    });
});

// GET ALL BLOGS API
router.get("/", (req, res) => {
    res.json({
        success: true,
        blogs
    });
});

// GET SINGLE BLOG API
router.get("/:id", (req, res) => {
    const blog = blogs.find(
        item => item.id === Number(req.params.id)
    );

    if (!blog) {
        return res.status(404).json({
            success: false,
            message: "Blog not found"
        });
    }

    res.json({
        success: true,
        blog
    });
});

// UPDATE BLOG API
router.put("/:id", (req, res) => {
    const blog = blogs.find(
        item => item.id === Number(req.params.id)
    );

    if (!blog) {
        return res.status(404).json({
            success: false,
            message: "Blog not found"
        });
    }

    const { title, category, image, content } = req.body;

    blog.title = title || blog.title;
    blog.category = category || blog.category;
    blog.image = image ?? blog.image;
    blog.content = content || blog.content;

    res.json({
        success: true,
        message: "Blog updated successfully!",
        blog
    });
});

// DELETE BLOG API
router.delete("/:id", (req, res) => {
    const index = blogs.findIndex(
        item => item.id === Number(req.params.id)
    );

    if (index === -1) {
        return res.status(404).json({
            success: false,
            message: "Blog not found"
        });
    }

    blogs.splice(index, 1);

    res.json({
        success: true,
        message: "Blog deleted successfully!"
    });
});

module.exports = router;
