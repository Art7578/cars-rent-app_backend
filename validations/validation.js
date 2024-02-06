import { body } from "express-validator";

export const registerValidation = [
    body('email','Invalid mail format').isEmail(),
    body('password', 'Password must be at least 6 characters').isLength({min: 6}),
    body('fullName', 'Enter your name').isLength({min: 3}),
];

export const loginValidation = [
    body('email','Invalid mail format').isEmail(),
    body('password', 'Password must be at least 6 characters').isLength({min: 6}),
];

export const carsCatalogValidation = [
    body('year', 'Invalid year').isInt({ min: 1900, max: new Date().getFullYear() }),
    body('make', 'Make is required').isString(),
    body('model', 'Model is required').isString(),
    body('type', 'Type is required').isString(),
    body('img', 'Invalid image URL').isURL(),
    body('description', 'Description is required').isString(),
    body('fuelConsumption', 'Invalid fuel consumption').isNumeric(),
    body('engineSize', 'Engine size is required').notEmpty(),
    body('accessories', 'Accessories must be an array').isArray(),
    body('functionalities', 'Functionalities must be an array').isArray(),
    body('rentalPrice', 'Invalid rental price').isString(),
    body('rentalCompany', 'Rental company is required').isString(),
    body('address', 'Address is required').isString(),
    body('rentalConditions', 'Rental conditions are required').isString(),
    body('mileage', 'Invalid mileage').isInt({ min: 0 }),
];