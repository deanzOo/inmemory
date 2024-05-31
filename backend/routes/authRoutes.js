const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User'); // Adjust the path as necessary

const router = express.Router();

router.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        let user = await User.findOne({ username });
        if (user) {
            return res.status(400).json({
                error: 'משתמש כבר קיים'
            });
        }
        const hashedPassword = await bcrypt.hash(password, 10); // Hash the password before saving
        user = new User({ username, password: hashedPassword });
        await user.save();

        const token = jwt.sign({ userId: user._id, username }, '47f46f17b6e1009de743455f1b483238', { expiresIn: '1h' }); // Use your secret key here

        res.status(201).json({
            message: 'משתמש התחבר בהצלחה',
            token: token
        });
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});

router.post('/login', (req, res) => {
    try {
        const { username, password } = req.body;
        User.findOne({ username })
            .then(user => {
                if (!user) {
                    return res.status(401).json({
                        error: 'נכשל באימות'
                    });
                }
                bcrypt.compare(password, user.password, (err, result) => {
                    if (err) {
                        return res.status(401).json({
                            error: 'נכשל באימות'
                        });
                    }
                    const token = jwt.sign({ userId: user._id, username }, '47f46f17b6e1009de743455f1b483238', { expiresIn: '1h' });
                    res.status(200).json({ token });
                });
            })
            .catch(err => {
                res.status(500).json({
                    error: err.message
                });
            });
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});

module.exports = router;
