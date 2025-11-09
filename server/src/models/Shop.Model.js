import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const ShopSchema = new Schema(
    {
        shopname: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        image: {
            type: String,
            trim: true,
        },
        address: {
            type: Schema.Types.ObjectId,
            ref: 'Address',
            required: true,
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
    },
    { timestamps: true }
);

export default model('Shop', ShopSchema);

