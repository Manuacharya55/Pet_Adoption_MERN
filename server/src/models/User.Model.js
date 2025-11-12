import {Schema, model} from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";

const UserSchema = new Schema({
    fullname:{
        type:String,
        required : true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    address:{
        type:Schema.Types.ObjectId,
        ref :'Address'
    },
    role:{
        type:String,
        enum:["user","admin","shopkeeper"],
        default:"user"
    },
    shop:{
        type:Schema.Types.ObjectId,
        ref:'Shop'
    }
});

UserSchema.pre("save",async function(next){
    if(!this.isModified("password")) return next()
    
    this.password = await bcrypt.hash(this.password,10);
    return next()
})

UserSchema.methods.comparePassword = async function(password){
    return bcrypt.compare(password,this.password)
}

UserSchema.methods.generateToken = async function(){
    return await jwt.sign({
        _id:this._id,
        role:this.role
    },process.env.JWT_SECRET)
}

const User = model("User",UserSchema);
export default User;