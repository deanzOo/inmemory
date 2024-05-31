const jwt = require('jsonwebtoken');

// נגדיר נתיב ביניים שימושי שיבדוק אם המשתמש מחובר
const auth = (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        req.user = jwt.verify(token, '47f46f17b6e1009de743455f1b483238');
        next();
    } catch (error) {
        res.status(401).json({error: 'Please authenticate.'});
    }
};

module.exports = auth;
