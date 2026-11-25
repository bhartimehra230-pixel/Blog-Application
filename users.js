
const express = require("express");
const router = express.Router();

let users = [];

// REGISTER API
router.post("/register", (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({
            success: false,
            message: "Please fill all fields"
        });
    }

    const existingUser = users.find(
        user => user.email === email
    );

    if (existingUser) {
        return res.status(409).json({
            success: false,
            message: "Email already registered"
        });
    }

    const newUser = {
        id: Date.now(),
        name,
        email,
        password
    };

    users.push(newUser);

    res.status(201).json({
        success: true,
        message: "Registration successful!",
        user: {
            id: newUser.id,
            name: newUser.name,
            email: newUser.email
        }
    });
});

// GET ALL USERS API
router.get("/", (req, res) => {
    res.json({
        success: true,
        users: users.map(user => ({
            id: user.id,
            name: user.name,
            email: user.email
        }))
    });
});

// LOGIN API
router.post("/login", (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: "Enter email and password"
        });
    }

    const user = users.find(
        user =>
            user.email === email &&
            user.password === password
    );

    if (!user) {
        return res.status(401).json({
            success: false,
            message: "Invalid email or password"
        });
    }

    res.json({
        success: true,
        message: "Login successful!",
        user: {
            id: user.id,
            name: user.name,
            email: user.email
        }
    });
});

module.exports = router;
