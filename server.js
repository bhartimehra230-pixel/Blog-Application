
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Import routes
const userRoutes = require("./users");
const blogRoutes = require("./blogs");

// API routes
app.use("/api/users", userRoutes);
app.use("/api/blogs", blogRoutes);

// Home route
app.get("/", (req, res) => {
    res.send("Blog Application Backend is Running!");
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
