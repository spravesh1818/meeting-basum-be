import { verifyAccessToken } from '../util/jwt.util.js';

function authenticate(req, res, next) {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({
            message: 'Unauthorized'
        })
    }

    const decoded = verifyAccessToken(token);
    if (!decoded) {
        return res.status(401).json({
            message: 'Invalid token'
        })
    }
    req.user = decoded.user;
    next();
}

export default authenticate;