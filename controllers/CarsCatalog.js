import Car from '../models/cars.js';

export const create = async (req, res) => {
    try {
        const doc = new Car({
            year: req.body.year,
            make: req.body.make,
            model: req.body.model,
            type: req.body.type,
            img: req.body.img,
            description: req.body.description,
            fuelConsumption: req.body.fuelConsumption,
            engineSize: req.body.engineSize,
            accessories: req.body.accessories,
            functionalities: req.body.functionalities,
            rentalPrice: req.body.rentalPrice,
            rentalCompany: req.body.rentalCompany,
            address: req.body.address,
            rentalConditions: req.body.rentalConditions,
            mileage: req.body.mileage
        });

        const post = await doc.save();

        res.json(post);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Failed to post car'
        });
    }
};