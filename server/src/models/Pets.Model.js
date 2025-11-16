import {Schema,model} from "mongoose"

const PetSchema = new Schema({
    name:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        required:true,
    },
    age:{
        type:Number,
        required:true,
    },
    breed:{
        type:String,
        required:true,
    },
    gender:{
        type:String,
        required:true,
        enum:["male","female"]
    },
    category:{
        type:Schema.Types.ObjectId,
        ref:"Category",
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    shop:{
        type:Schema.Types.ObjectId,
        ref:"Shop",
        required:true
    },
    isAdopted:{
        type:Boolean,
        default:false
    },
    isActive:{
        type:Boolean,
        default:true
    }
},{timestamps:true})

const Pet = model("Pet",PetSchema);
export default Pet;