const jwt = require('jsonwebtoken');
const config = require('../config/config');

const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ 
            code: 401,
            message: 'No token!',
        });
    }

    try {
        const decoded = jwt.verify(token, config.jwtSecret);
        req.user = decoded.user;
        next(); 
    } catch (error) {
        return res.status(401).json({ 
            code: 401,
            message: 'Invalid token!'
        });
    }
};

module.exports = verifyToken;
