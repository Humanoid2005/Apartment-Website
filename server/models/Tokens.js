import mongoose from "mongoose";

const TokenSchema = new mongoose.Schema({
    type:String,
    house_number:String,
    token: String,
    expires:Date
});

export const Token = mongoose.model("Tokens",TokenSchema);