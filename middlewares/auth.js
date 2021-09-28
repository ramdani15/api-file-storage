const jwt = require('jsonwebtoken');
const AsyncHandler = require('./async');
const ErrorResponse = require('../utils/errorResponse');


// Protect routes
exports.protect = AsyncHandler(async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) { // Set token from header
        token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies.token) { // Set token from cookie
        token = req.cookies.token;
    }

    // Make sure token exists
    if (!token) {
        return next(new ErrorResponse('Not authorized to access this route', 401));
    }

    try {
        if (token !== process.env.TOKEN) {
            return next(new ErrorResponse('Token Invalid', 403));
        }
        next();
    } catch (err) {
        return next(new ErrorResponse('Not authorized to access this route', 401));
    }
});
