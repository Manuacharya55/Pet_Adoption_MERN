import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const PetSchema = new Schema(
    {
        petName: {
            type: String,
            required: true,
            trim: true,
        },
        breed: {
            type: String,
            required: true,
            trim: true,
        },
        category: {
            type: Schema.Types.ObjectId,
            ref: 'Category',
            required: true,
        },
        vaccinatedAt: {
            type: Date,
            required: true,
        },
        year: {
            type: Number,
            required: true,
        },
        gender: {
            type: String,
            enum: ['male', 'female'],
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        image: {
            type: String,
            trim: true,
        },
        description: {
            type: String,
            trim: true,
        },
        isAdopted: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

export default model('Pet', PetSchema);

