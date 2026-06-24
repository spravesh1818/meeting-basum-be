import userModel from '../models/user.model.js';
import { hashPassword } from '../util/auth.util.js';
import { getCache, setCache } from './cache.service.js';

export const createUser = async (userData) => {
    console.log(userData.password);
    userData.password = await hashPassword(userData.password);
    const user = new userModel(userData);
    await user.save();
    return user;
};


export const getUsers = async () => {

    const cachedUsers = await getCache('users');
    if (cachedUsers) {
        return JSON.parse(cachedUsers);
    }
    const users = await userModel.find().select('-password');
    await setCache('users', JSON.stringify(users), 300);
    console.log("Users fetched from database");
    return users;
}

export const getUserById = async (id) => {
    const user = await userModel.findById(id).select('-password');
    return user;
}

export const updateUser = async (id, userData) => {
    const user = await userModel.findById(id);
    if (!user) {
        throw new Error('User not found');
    }

    if (userData.name) {
        user.name = userData.name;
    }
    if (userData.password) {
        user.password = hashPassword(userData.password);
    }
    await user.save();
    return user;
}


export const deleteUser = async (id) => {
    const user = await userModel.findByIdAndDelete(id).select('-password');
    return user;
}
