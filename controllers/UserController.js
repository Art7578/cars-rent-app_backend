import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { validationResult } from "express-validator";
import User from '../models/user.js';


export const register = async (req,res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json(errors.array());
        }

        const password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        const doc = new User({
            email: req.body.email,
            fullName: req.body.fullName,
            passwordHash: hash,
        });

        const user = await doc.save();

        const token = jwt.sign({
                _id: user._id,
            },
            'secret123,',
            {
                expiresIn: '30d'
            },
        );

        const {passwordHash, ...userData} = user._doc;

        res.json({
            ...userData,
            token,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Failed to register',
        });
    }
};

export const login = async (req, res) => {
    try {
        const user = await User.findOne({email: req.body.email});

        if (!user) {
            return res.status(404).json({
                message: 'User not found',
            });
        }

        const isValidPass = await bcrypt.compare(req.body.password, user._doc.passwordHash);

        if (!isValidPass) {
            return res.status(400).json({
                message: 'Wrong login or password',
            });
        }

        const token = jwt.sign({
                _id: user._id,
            },
            'secret123',
            {
                expiresIn: '30d'
            },
        );

        const {passwordHash, ...userData} = user._doc;

        res.json({
            ...userData,
            token,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Failed to login',
        });
    }
};