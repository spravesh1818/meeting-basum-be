import express from 'express';
import { validateCreateUserRequest, validateUpdateUserRequest } from '../middlewares/validators/user.schema.validator.js';
import { getUsers, createUser, getUserById, updateUser, deleteUser } from '../service/user.service.js';
const userController = express.Router();

userController.get('/', async (req, res) => {
    try {
        const users = await getUsers();
        res.json({
            message: 'Users fetched successfully',
            data: users
        })
    }
    catch (error) {
        console.log("Error fetching users: ", error);
        res.status(error.status).json({
            message: error.message,
        })
    }
});

userController.get('/:id', async (req, res) => {
    try {
        const user = await getUserById(req.params.id);
        res.json({
            message: 'User fetched successfully',
            data: user
        })
    }
    catch (error) {
        res.status(500).json({
            message: 'Internal server error',
            error: error.message
        })
    }

});

userController.post('/', validateCreateUserRequest, async (req, res) => {
    try {
        const user = await createUser(req.body);
        res.json({
            message: 'User created successfully',
            data: user
        })
    }
    catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({
                message: 'User already exists',
                error: error.message
            })
        }
    }
});


// PUT--> Update the entire user
// PATCH--> Update the partial user


userController.patch('/:id', validateUpdateUserRequest, async (req, res) => {
    try {
        const user = await updateUser(req.params.id, req.body);
        res.json({
            message: 'User updated successfully',
            data: user
        })
    }
    catch (error) {
        res.status(500).json({
            message: 'Internal server error',
            error: error.message
        })
    }
});

userController.delete('/:id', async (req, res) => {
    try {
        const user = await deleteUser(req.params.id);
        res.json({
            message: 'User deleted successfully',
            data: user
        })
    }
    catch (error) {
        res.status(error.status).json({
            message: error.message,
        })
    }
});

export default userController;