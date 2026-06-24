import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';

function connectDB() {

    console.log(process.env.DATABASE_URL);
    const conn = mongoose.createConnection(process.env.DATABASE_URL);

    conn.on('connected', () => console.log('connected'));
    conn.on('open', () => console.log('open'));
    conn.on('disconnected', () => console.log('disconnected'));
    conn.on('reconnected', () => console.log('reconnected'));
    conn.on('disconnecting', () => console.log('disconnecting'));
    conn.on('close', () => console.log('close'));

    return conn;
}

export default connectDB;