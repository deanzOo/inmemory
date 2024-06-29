import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    admin: { type: Boolean, default: false },
    banned: { type: Boolean, default: false },
});

const User = mongoose.models.User || mongoose.model('User', UserSchema);

export default User;
