import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const generateAccessToken = (user) => {
    return jwt.sign({ user }, process.env.JWT_SECRET, { expiresIn: '10m' });
}

export const generateRefreshToken = (user) => {
    return jwt.sign({ user }, process.env.JWT_SECRET, { expiresIn: '30d' });
}

export const verifyAccessToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET);
}

export const verifyRefreshToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET);
}