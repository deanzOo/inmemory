import mongoose from 'mongoose';

const StorySchema = new mongoose.Schema({
    content: { type: String, required: true },
    user_name: { type: String, required: true },
    soldier: { name: { type: String, required: true }, image: { type: String, required: true } },
    soldier_id: { type: String, required: true },
    family: { type: Boolean, default: false },
    replies: { type: Array, default: [] },
    approved: { type: Boolean, default: false }
});

const Story = mongoose.models.Story || mongoose.model('Story', StorySchema);

export default Story;
