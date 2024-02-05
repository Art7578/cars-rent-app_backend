import { body } from "express-validator";

export const registerValidation = [
    body('email','Invalid mail format').isEmail(),
    body('password', 'Password must be at least 6 characters').isLength({min: 6}),
    body('fullName', 'Enter your name').isLength({min: 3}),
];