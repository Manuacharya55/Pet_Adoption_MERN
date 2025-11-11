import { Schema, model } from 'mongoose';

const AddressSchema = new Schema(
    {
        phonenumber: {
            type: String,
            required: true,
            trim: true,
        },
        address: {
            type: String,
            required: true,
            trim: true,
        },
        district: {
            type: String,
            required: true,
            trim: true,
        },
        state: {
            type: String,
            required: true,
            trim: true,
        },
        lng: {
            type: Number,
            required: true,
        },
        lat: {
            type: Number,
            required: true,
        },
        user:{
            type: Schema.Types.ObjectId,
            ref:"User",
            required:true,
        }
    },
    { timestamps: true }
);

export default model('Address', AddressSchema);

