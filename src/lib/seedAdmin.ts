export default async function seedAdmin() {
    const User = require('../models/User').default;
    const bcrypt = require('bcryptjs');
    const username = 'admin';
    const password = process.env.ADMIN_PASSWORD;
    const existingUser = await User.findOne({ username });
    if (existingUser) {
        console.log('Admin user already exists');
        return;
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword, admin: true });
    try {
        await newUser.save();
        console.log('Admin user created successfully');
    } catch (error) {
        console.error('Error creating admin user');
    }
}
