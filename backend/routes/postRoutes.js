const express = require('express');
const Story = require('../models/Story');
const Reply = require('../models/Reply');
const auth = require('../middleware/auth'); // Adjust the path as necessary

const router = express.Router();

router.post('/createPost', auth, async (req, res) => {
    try {
        const { content } = req.body;
        const current_date = new Date();
        const formatted_date = current_date.getDate() + "." + (current_date.getMonth() + 1) + "." + current_date.getFullYear() + " " + current_date.getHours() + ":" + current_date.getMinutes() + ":" + current_date.getSeconds();
        const post = new Story({ username: req.user.username, content, time: formatted_date });
        await post.save();

        res.status(201).json();
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});

router.post('/createReply', auth, async (req, res) => {
    try {
        const { story_id, content } = req.body;
        const current_date = new Date();
        const formatted_date = current_date.getDate() + "." + (current_date.getMonth() + 1) + "." + current_date.getFullYear() + " " + current_date.getHours() + ":" + current_date.getMinutes() + ":" + current_date.getSeconds();
        const reply = new Reply({ story_id, username: req.user.username, content, time: formatted_date });
        await reply.save();

        res.status(201).json();
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});

module.exports = router;
