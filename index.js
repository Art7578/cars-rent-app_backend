import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

import { registerValidation, loginValidation, carsCatalogValidation } from './validations/validation.js';
import { register, login } from "./controllers/UserController.js";
import {create, getAll} from './controllers/CarsCatalog.js';

dotenv.config();
const {DB_HOST, PORT} = process.env;

mongoose 
    .connect(DB_HOST)
    .then(() => console.log('DB Okay'))
    .catch((err) => console.log('DB Error', err));

const app = express();

app.use(express.json());
app.use(cors());

app.post('/auth/register', registerValidation, register);
app.post('/auth/login', loginValidation, login);

app.post('/catalog', carsCatalogValidation, create);
app.get('/catalog', getAll);

app.listen(PORT, (err) => {
    if (err) {
       return console.log(err); 
    }
    console.log('Server OK');
})