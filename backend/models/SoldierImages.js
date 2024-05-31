const mongoose = require('mongoose');

const SoldierImages = new mongoose.Schema({
    soldier_id: { type: String, required: true },
    image_url: { type: String, required: true },
});

// Compile and export the model
module.exports = mongoose.model('SoldierImages', SoldierImages);
