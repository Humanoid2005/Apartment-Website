import mongoose from "mongoose";

const AnnouncementSchema = new mongoose.Schema({
    title:{type:String,required:true},
    information: {type:String,required:true},
    DOA:{type:Date,default:new Date()}
});

export const Announcement = mongoose.model("Announcements",AnnouncementSchema);