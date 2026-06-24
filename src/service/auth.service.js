import userModel from '../models/user.model.js';
import { comparePassword } from '../util/auth.util.js';
import { generateAccessToken, generateRefreshToken } from '../util/jwt.util.js';
import { createUser } from './user.service.js';

export const login = async (email, password) => {
    const user = await userModel.findOne({ email });
    if (!user) {
        throw new Error('User not found');
    }
    const isPasswordValid = comparePassword(password, user.password);
    if (!isPasswordValid) {
        throw new Error('Invalid password');
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
    return {
        accessToken: accessToken,
        refreshToken: refreshToken,
        user: user
    };
}

export const register = async (name, email, password) => {
    const user = await createUser({ name: name, email: email, password: password });
    return user;
}

