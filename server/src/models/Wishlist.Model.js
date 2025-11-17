import {Schema , model} from "mongoose";

const WishlistSchema = new Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    pet:{
        type:Schema.Types.ObjectId,
        ref:"Pet",
        required:true
    }
},{timestamps:true})

const Wishlist = model("Wishlist",WishlistSchema);
export default Wishlist