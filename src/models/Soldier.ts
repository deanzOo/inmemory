import mongoose from 'mongoose';

const SoldierSchema = new mongoose.Schema({
    name: { type: String, required: true },
    rank: { type: String, required: true },
    unit: { type: String, required: true },
    dateOfDeath: { type: Date, required: true },
    image: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    approved: { type: Boolean, default: false },
    published_by: { type: String, required: true }
});

const Soldier = mongoose.models.Soldier || mongoose.model('Soldier', SoldierSchema);

export default Soldier;
