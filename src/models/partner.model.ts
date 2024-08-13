import mongoose from "mongoose";

const partnerSchema = new mongoose.Schema({
    tradingName: {
        type: String,
        required: true,
    },
    ownerName: {
        type: String,
        required: true,
    },
    document: {
        type: String,
        unique: true,
        required: true,
    },
    coverageArea: {
        type: {
            type: String,
            enum: ["MultiPolygon"],
            required: true,
        },
        coordinates: {
            type: [[[[Number]]]],
            required: true,
        },
    },
    address: {
        type: {
            type: String,
            enum: ["Point"],
            required: true,
        },
        coordinates: {
            type: [Number],
            required: true
        }
    }
});

const Partner = mongoose.model("partners", partnerSchema);

export default Partner;