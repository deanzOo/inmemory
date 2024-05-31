const mongoose = require('mongoose');

const StorySchema = new mongoose.Schema({
    username: { type: String, required: true },
    soldier_id: { type: String, required: true },
    isFamily: { type: Boolean, required: true },
    content: { type: String, required: true },
    time: { type: String, required: true },
});

// Compile and export the model
module.exports = mongoose.model('Story', StorySchema);
