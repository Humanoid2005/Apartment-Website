import mongoose from "mongoose";

const ResidentSchema = new mongoose.Schema({
    house_number:String,
    owner: String,
    resident:String,
    email:String,
},{ collection: "Residents" });

export const Resident = mongoose.model("Residents",ResidentSchema);