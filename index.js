import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { registerValidation } from './validations/auth.js';
import checkAuth from './utils/checkAuth.js';

import { register, login, getMe } from "./controllers/UserController.js";

dotenv.config();
const {DB_HOST, PORT} = process.env;

mongoose
    .connect(DB_HOST)
    .then(() => console.log('DB Okay'))
    .catch((err) => console.log('DB Error', err));

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello world!')
});

app.post('/auth/register', registerValidation, register);
app.post('/auth/login', login);
app.get('/auth/me', checkAuth, getMe)

app.listen(PORT, (err) => {
    if (err) {
       return console.log(err); 
    }
    console.log('Server OK');
})