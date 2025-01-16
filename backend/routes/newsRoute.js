
const express = require('express');
const News = require('../models/News');
const crypto = require("crypto");
const router = express.Router();


// Route to fetch all news articles
router.get('/kidgage-news', async (req, res) => {
    try {
        const news = await News.find({ activeStatus: true });
        res.status(200).json(news);
    } catch (error) {
        console.error("Error fetching news:", error);
        res.status(500).json({ message: "Internal server error. Please try again later." });
    }
});



// Route to fetch a specific news article by ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const news = await News.findById(id);
        if (!news) {
            return res.status(404).json({ message: "News not found" });
        }
        res.status(200).json(news);
    } catch (error) {
        console.error("Error fetching news:", error);
        res.status(500).json({ message: "Internal server error. Please try again later." });
    }
});

module.exports = router;
