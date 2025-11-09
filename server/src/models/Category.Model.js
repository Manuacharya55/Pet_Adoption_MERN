import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const CategorySchema = new Schema(
    {
        categoryImg: {
            type: String,
            trim: true,
        },
        categoryName: {
            type: String,
            required: true,
            trim: true,
            unique: true,
        },
        isActive: {
            type: Boolean,
            default: true,
        },
    },
    { timestamps: true }
);

export default model('Category', CategorySchema);

