const mongoose = require('mongoose');

const SoldierVideos = new mongoose.Schema({
    soldier_id: { type: String, required: true },
    video_url: { type: String, required: true },
});

module.exports = mongoose.model('SoldierVideos', SoldierVideos);
