import mongoose from "mongoose";

const ImageSchema = new mongoose.Schema({
    house_number:String,
    image:String
});

export const ProfileImage = mongoose.model("Images",ImageSchema);