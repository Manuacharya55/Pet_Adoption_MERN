import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const AdoptionSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        address: {
            type: Schema.Types.ObjectId,
            ref: 'Address',
            required: true,
        },
        pet: {
            type: Schema.Types.ObjectId,
            ref: 'Pet',
            required: true,
        },
        status: {
            type: String,
            enum: ['pending', 'rejected', 'approved'],
            default: 'pending',
        },
        dateOfRequest: {
            type: Date,
            default: Date.now,
        },
    },
    { timestamps: true }
);

export default model('Adoption', AdoptionSchema);

