import express from 'express';
import dotenv from 'dotenv';
import userController from './controllers/user.controller.js';
import authController from './controllers/auth.controller.js';
import authenticate from './middlewares/auth.middleware.js';
import cors from 'cors';
dotenv.config();

const app = express();

app.use(cors("*"));
app.use(express.json());

app.get('/', (req, res) => {
    res.json({
        message: 'Hello from the server'
    })
});


app.use('/users', userController);
app.use('/auth', authController);


app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
})