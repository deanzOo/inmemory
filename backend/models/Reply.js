const mongoose = require('mongoose');

const ReplySchema = new mongoose.Schema({
    story_id: { type: String, required: true },
    username: { type: String, required: true},
    content: { type: String, required: true },
    time: { type: String, required: true },
});

module.exports = mongoose.model('Reply', ReplySchema);
