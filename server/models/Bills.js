import mongoose from "mongoose";

const BillSchema = new mongoose.Schema({
    bill_number:{type:String,required:true},
    house_number:{type:String,required:true},
    amount: {type:String,required:true},
    type:{type:String,default:"Maintainence"},
    pending:{type:Boolean,default:true},
    deadline:{type:Date},
});

export const Bill = mongoose.model("Bills",BillSchema);