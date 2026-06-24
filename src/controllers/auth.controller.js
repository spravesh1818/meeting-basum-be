import express from 'express';
import { validateLoginRequest, validateRegisterRequest } from '../middlewares/validators/auth.schema.validator.js';
import { login, register } from '../service/auth.service.js';


const authController = express.Router();

authController.post('/login', validateLoginRequest, async (req, res) => {
    try {
        console.log("Logging in...");
        const { email, password } = req.body;
        const loginResponse = await login(email, password);
        res.json({
            message: 'Login successful',
            data: loginResponse
        })
    }
    catch (error) {
        console.log("Error logging in: ", error);
        res.status(500).json({
            message: error.message,
        })
    }
});

authController.post('/register', validateRegisterRequest, async (req, res) => {
    try {
        console.log("Registering...");
        const { name, email, password } = req.body;
        const user = await register(name, email, password);
        res.json({
            message: 'Register successful',
            data: user
        })
    }
    catch (error) {
        console.log("Error registering: ", error);
        res.status(500).json({
            message: error.message,
        })
    }
});

export default authController;

