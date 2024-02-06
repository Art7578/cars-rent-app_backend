import mongoose from "mongoose";

const CarSchema = new mongoose.Schema({
    year: {
        type: Number,
        required: true,
        min: 1900,
        max: new Date().getFullYear()
    },
    make: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                return /^(ftp|http|https):\/\/[^ "]+$/.test(v);
            },
            message: props => `${props.value} is not a valid URL!`
        }
    },
    description: {
        type: String,
        required: true
    },
    fuelConsumption: {
        type: Number,
        required: true
    },
    engineSize: {
        type: String,
        required: true
    },
    accessories: {
        type: Array,
        required: true
    },
    functionalities: {
        type: Array,
        required: true
    },
    rentalPrice: {
        type: String,
        required: true
    },
    rentalCompany: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    rentalConditions: {
        type: String,
        required: true
    },
    mileage: {
        type: Number,
        required: true,
        min: 0
    }
}, {
    timestamps: true
});

export default mongoose.model('Car', CarSchema);