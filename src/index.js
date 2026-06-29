import express from 'express';
import dotenv from 'dotenv';
import userController from './controllers/user.controller.js';
import authController from './controllers/auth.controller.js';
import authenticate from './middlewares/auth.middleware.js';
import cors from 'cors';
dotenv.config();
import { AccessToken } from 'livekit-server-sdk';

const app = express();

app.use(cors("*"));
app.use(express.json());

app.get('/', (req, res) => {
    res.json({
        message: 'Hello from the server'
    })
});

app.post('/livekit/token', async (req, res) => {

    const { roomName, userName } = req.body;

    const accessToken = new AccessToken(process.env.LIVEKIT_API_KEY, process.env.LIVEKIT_API_SECRET, {
        identity: userName,
        room: roomName,
        ttl: 3600
    });

    console.log("accessToken: ", accessToken);


    accessToken.addGrant({
        roomJoin: true,
        room: roomName,
    });

    const token = await accessToken.toJwt();

    console.log("token: ", token);

    res.json({
        token
    })
});


app.use('/users', userController);
app.use('/auth', authController);


app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
})