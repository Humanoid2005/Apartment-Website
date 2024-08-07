import mongoose from "mongoose";

const UserDocumentSchema = new mongoose.Schema({
    house_number:String,
    name:String,
    file_id:String,
});

export const UserDocument = mongoose.model("UserDocuments",UserDocumentSchema);