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

export const getAll = async (req, res) => {
    try {
        const { page = 1, itemsPerPage = 8, brand, priceFrom, priceTo, mileageFrom, mileageTo } = req.query;
        const skip = (page - 1) * itemsPerPage;

        let filter = {};
        if (brand) {
            filter.make = brand;
        }
        if (priceFrom || priceTo) {
            filter.rentalPrice = {}; // Инициализируем объект фильтрации для цены
            if (priceFrom) {
                filter.rentalPrice.$gte = priceFrom;
            }
            if (priceTo) {
                filter.rentalPrice.$lte = priceTo;
            }
        }
        if (mileageFrom || mileageTo) {
            filter.mileage = {}; // Инициализируем объект фильтрации для пробега
            if (mileageFrom) {
                filter.mileage.$gte = mileageFrom;
            }
            if (mileageTo) {
                filter.mileage.$lte = mileageTo;
            }
        }
        // Добавьте обработку других критериев поиска, если необходимо

        const catalog = await Car.find(filter).skip(skip).limit(itemsPerPage);

        res.json(catalog);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Failed to get cars catalog'
        });
    }
};