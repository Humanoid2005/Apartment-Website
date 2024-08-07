import mongoose from "mongoose";

const ResidentSchema = new mongoose.Schema({
    house_number:String,
    owner: String,
    resident:String,
    email:String,
});
export const Resident = mongoose.model("residents",ResidentSchema,"residents");