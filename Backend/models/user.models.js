import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";



const userSchema = new mongoose.Schema({
    email:{
        type: String,
        unique: true,
        lowercase: true,
        required: function() { return !this.googleId; },
    },
    password:{
        type: String,
        required: function() { return !!this.googleId; } 
    },
    googleId: {
    type: String,
    unique: true,
    sparse: true,
    },
    avatar: {
        type: String, // Storing URL from Google or uploaded image
        required: true,
    },
    refreshToken: {
        type: String,
        default:"",
    },
    name: {
        type: String,
        required: true,
    },
    
},
{
    timestamps: true,
}
)

userSchema.pre("save", async function(next){
    if(!this.isModified("password") || !this.password) return next();

    this.password = await bcrypt.hash(this.password, 10);
    next();
})

userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id : this._id,
            email : this.email,
            name : this.name,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn : process.env.ACCESS_TOKEN_EXPIRY
        }
    );  
}

userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id : this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn : process.env.REFRESH_TOKEN_EXPIRY
        }
    );  
}

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password);   
}

export const User = mongoose.model("User", userSchema);