const express = require('express');
const Story = require('../models/Story');
const Reply = require('../models/Reply');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/stories', auth, async (req, res) => {
    try {
        const stories = await Story.find().lean();
        const replies = await Reply.find().lean();
        stories.forEach(story => {
            story.comments = replies.filter(reply => reply.story_id === story._id.toString());
        });
        res.status(200).json({stories: stories});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});

module.exports = router;
