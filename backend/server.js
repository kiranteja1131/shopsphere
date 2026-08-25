const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
mongoose.connect("mongodb://mongodb:27017/shopsphere")
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.error("MongoDB connection error:", err));

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Health check API
app.get("/health", (req, res) => {
    res.status(200).json({
        status: "UP",
        service: "ShopSphere Backend"
    });
});

// Products API
app.get("/api/products", (req, res) => {
    const products = [
        { id: 1, name: "Wireless Headphones", price: 2999, emoji: "🎧" },
        { id: 2, name: "Smart Watch", price: 4999, emoji: "⌚" },
        { id: 3, name: "Running Shoes", price: 3499, emoji: "👟" },
        { id: 4, name: "Laptop Backpack", price: 1999, emoji: "🎒" }
    ];

    res.json(products);
});

app.listen(PORT, () => {
    console.log(`ShopSphere backend running on port ${PORT}`);
});