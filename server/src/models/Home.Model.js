import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const HomeSchema = new Schema(
    {
        image: {
            type: String,
            trim: true,
        },
        tagline: {
            type: String,
            trim: true,
        },
    },
    { timestamps: true }
);

export default model('Home', HomeSchema);

