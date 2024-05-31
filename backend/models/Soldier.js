const mongoose = require('mongoose');

const SoldierSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    rank: { type: String, required: true },
    unit: { type: String, required: true },
    mainImageUrl: { type: String, required: true },
    mainVideoUrl: { type: String, required: true },
});

module.exports = mongoose.model('Soldier', SoldierSchema);
