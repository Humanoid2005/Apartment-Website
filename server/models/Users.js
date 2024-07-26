import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    house_number:String,
    name: String,
    mobile_number:String,
    email:String,
    password:String
});

export const User = mongoose.model("Users",UserSchema);