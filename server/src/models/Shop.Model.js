import {Schema,model} from "mongoose";

const ShopSchema = new Schema({
    image :{
        type:String,
        required:true
    },
    shopname : {
        type:String,
        required:true,
        minlength:5
    },
    user : {
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    address : {
        type : Schema.Types.ObjectId,
        ref :"Address",
        required : true
    },
    pet : [
        {
            type:Schema.Types.ObjectId,
            ref:"Pet"
        }
    ]
},{timestamps:true})

const Shop = model("Shop",ShopSchema)

export default Shop;