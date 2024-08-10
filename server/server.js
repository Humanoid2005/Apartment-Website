import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from 'url';
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import session from "express-session";
import passport from "passport";
import { Strategy } from "passport-local";
import bodyParser from "body-parser";
import crypto from "crypto";
import multer from "multer";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();
import { User } from "./models/Users.js";
import { Token } from "./models/Tokens.js";
import {Resident} from "./models/Residents.js";
import { Announcement } from "./models/Announcements.js";
import {ProfileImage} from "./models/Images.js";
import {Bill} from "./models/Bills.js";
import { UserDocument } from "./models/UserDocuments.js";
import sendMail from "./mailer.js";
import generateReceipt from "./create_pdf.js";

const app = express();
const frontenddomain = "https://sowgandhika-apartments.netlify.app";//"http://localhost:5173"
const port = process.env.PORT || 8000;
const saltRounds = 10;
const house_numbers = ["admin","001","002","003","004","101","102","103","104","105","201","202","203","204","205","301","302","303","304"];
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbConnectionString = `mongodb+srv://SriramSrikanth:${process.env.MongoDBPassword}@sowgandhikaapartmentpro.igtlexc.mongodb.net/Users?retryWrites=true&w=majority&appName=SowgandhikaApartmentProject`;

app.use(cors({
  origin: frontenddomain,
  methods: ["GET", "POST", "PATCH", "DELETE"],
  credentials: true
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({
  secret:process.env.secretKey,
  resave: true,
  saveUninitialized: true,
  cookie:{
    maxAge:1000*60*60*24,
    secure:true,
    sameSite:"None",
    domain:".netlify.app"
  }
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const UsersDB = await mongoose.connect(dbConnectionString)
.then(() => {
  console.log('Connected to MongoDB');
})
.catch(err => {
  console.error('Error connecting to MongoDB:', err);});

const imgstorage = multer.diskStorage({
  destination: function(req,file,callback){
      callback(null,path.join(__dirname, 'uploads/profile-images'));
  },
  filename: function(req,file,callback){
    callback(null,Date.now()+path.extname(file.originalname))
  },
});

const filestorage = multer.diskStorage({
  destination: function(req,file,callback){
      callback(null,path.join(__dirname,"uploads/user-documents"));
  },
  filename: function(req,file,callback){
    callback(null,Date.now()+path.extname(file.originalname))
  },
});

const imgupload = multer({
    storage:imgstorage,
    onFileUploadStart: function (file) {
    console.log(file.originalname + ' is starting ...')
    },
});

const fileupload = multer({
  storage:filestorage,
  onFileUploadStart: function (file) {
  console.log(file.originalname + ' is starting ...')
  },
});

function generateToken(expiryMinutes = 60) {
  const token = crypto.randomBytes(20).toString('hex');
  const expires = Date.now() + expiryMinutes * 60 * 1000;
  return { token, expires };
}

app.get("/",(req,res)=>{
  res.send({message:"homepage of backend is running..."});
})
app.get("/api/logout",async(req,res)=>{
  if(req.isAuthenticated()){
    await Token.deleteOne({type:"authToken",house_number:req.user.house_number});
  }
  req.logOut((err)=>{
    if(err){
      return next(err);
    }
    res.redirect(frontenddomain+"/");
  })
})

app.get("/api/profile-image",async (req,res)=>{
  if(req.isAuthenticated()){
    const Img = await ProfileImage.findOne({house_number:req.user.house_number});
    const output = Img?Img.image:null; 
    res.json(output);
  }
  else{
    res.redirect(frontenddomain+"/")
  }
})

app.get("/api/user-documents",async (req,res)=>{
  if(req.isAuthenticated()){
    const File = await UserDocument.find({house_number:req.user.house_number});
    const output = File?File:null;
    res.json(output);
  }
  else{
    res.redirect(frontenddomain+"/");
  }
})

app.get("/api/is-authenticated",async (req,res)=>{
  if(req.isAuthenticated()){
    console.log(`${req.user.house_number} is authenticated...`);
    res.json({house_number:req.user.house_number,status:true});
  }
  else{
    res.json({house_number:null,status:false});
  }
})

app.get("/api/profile-details",async (req,res)=>{
  if(req.isAuthenticated()){
    const house_number = req.user.house_number;
    const ProfileDetails = await User.findOne({house_number:house_number});
    res.json(ProfileDetails);
  }
  else{
    res.redirect(frontenddomain+"/");
  }
})

app.get("/api/all-users",async (req,res)=>{
  const AllUserDetails = await User.find({});
  res.json(AllUserDetails);
})

app.get("/api/announcements",async (req,res)=>{
  const Announcements = await Announcement.find({});
  res.json(Announcements);
})

app.get("/api/residents-data",async (req,res)=>{
  const UsersData = await User.find({});
  for(var i=0;i<UsersData.length;i++){
    await Resident.updateOne({house_number:UsersData[i].house_number},{email:UsersData[i].email,resident:UsersData[i].name});
  }
  const ResidentData = await Resident.find({});
  res.json(ResidentData);
})

app.get("/api/bills",async (req,res)=>{
  const AllBills = await Bill.find({});
  res.json(AllBills);
})

/*app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist', 'index.html'));
})*/

app.post("/api/user-details",async (req,res)=>{
  if(req.isAuthenticated()){
    const house_number = req.user.house_number;
    const findInfo = await User.findOne({house_number:house_number});
    const editInfo = {
      house_number:house_number,
      name:req.body.name||findInfo.name,
      mobile_number:req.body.mobile_number||findInfo.mobile_number,
      email:req.body.email||findInfo.email,
      password:findInfo.password
    };
    await User.updateOne({house_number:house_number},editInfo);
    res.redirect(frontenddomain+"/profile");
  }
  else{
    res.redirect(frontenddomain+"/");
  }
})

app.post("/api/user-details/change-password",async (req,res)=>{
  if(req.isAuthenticated()){
    const house_number = req.user.house_number;
    const newPassword = req.body.password;
    const newReenter_Password = req.body.reenter_password;
  
    if(newPassword==newReenter_Password){
      try{
        bcrypt.hash(newPassword,saltRounds,async (err,hash)=>{
          if(err){
            console.log(err);
          }
          else{
            const update = await User.findOneAndUpdate({house_number:house_number},{password:hash});
            const redirectURL = req.user.house_number=="admin"?"/admin/announcements":"/announcements";
            res.redirect(frontenddomain+redirectURL);
          }
          })
      }
      catch(err){
        console.log(err);
      }
    }
    else{
      res.send("Re-entered password does not match the password entered initially")
    }
  }
  else{
    res.redirect(frontenddomain+"/");
  }
})

app.patch("/api/residents-data/:id",async (req,res)=>{
  const house_number = req.params.id;
  const FindUser = await Resident.findOne({house_number:house_number});
  const updatedData = {house_number:house_number,owner:req.body.owner||FindUser.owner,resident:req.body.resident||FindUser.resident};
  await Resident.updateOne({house_number:house_number},updatedData);
  res.redirect(frontenddomain+"/residents-loggedIn");
})

app.post("/api/announcements/:id",async (req,res)=>{
  const AnId = req.params.id;
  const FindAn = await Announcement.findOne({_id:AnId});
  const replaceData = {title:req.body.title||FindAn.title,information:req.body.information||FindAn.information,DOA:req.body.DOA||FindAn.DOA};
  await Announcement.updateOne({_id:AnId},replaceData);
  const newUrl = req.user.house_number=="admin"?"/admin/announcements":"/announcements";
  res.redirect(frontenddomain+newUrl);
})

app.post("/api/announcements",async (req,res)=>{
  const InsertionData=  {title:req.body.title,information:req.body.information,DOA:req.body.date};
  const addAnnouncement = new Announcement(InsertionData);
  addAnnouncement.save();
  const newUrl = req.user.house_number=="admin"?"/admin/announcements":"/announcements";
  res.redirect(frontenddomain+newUrl);
})

app.post("/api/profile-image",imgupload.single("imagesrc"),async (req,res)=>{

  const FindImage = await ProfileImage.findOne({house_number:req.user.house_number});
  if(FindImage){
    fs.unlink(path.join(__dirname,`uploads/profile-images/${FindImage.image}`), async (err) => {
      if (err) {
        console.log(err);
        return res.status(500).send('Error deleting file');
      }
    })
    const updateImage = await ProfileImage.updateOne({house_number:req.user.house_number},{image:req.file.filename||FindImage.image})
  }
  else{
    const newImage = new ProfileImage({house_number:req.user.house_number,image:req.file.filename});
    newImage.save();
  }
  res.redirect(frontenddomain+"/profile");
})

app.post("/api/user-documents",fileupload.single("filesrc"),async (req,res)=>{
  const AddFile = new UserDocument({house_number:req.user.house_number,name:req.body.filename,file_id:`${req.user.house_number}${req.file.filename}`});
  AddFile.save();
  res.redirect(frontenddomain+"/user-documents");
})

app.post("/api/delete-user-documents/:id",async (req,res)=>{
  const house_number = req.params.id.slice(0,5)!="admin"?req.params.id.slice(0,3):req.params.id.slice(0,5);
  const file_name = req.params.id.slice(0,5)!="admin"?req.params.id.slice(3):req.params.id.slice(5);
  const DeleteFile = await UserDocument.deleteOne({house_number:house_number,file_id:req.params.id});
  fs.unlink(path.join(__dirname,`uploads/user-documents/${file_name}`), async (err) => {
    if (err) {
      console.log(err);
      return res.status(500).send('Error deleting file');
    }
    else{
      console.log("file deleted...");
    }
  })
  res.redirect(frontenddomain+"/user-documents");
})

app.post("/api/download-user-documents/:id",async (req,res)=>{
  const file_name = req.params.id.slice(0,5)!="admin"?req.params.id.slice(3):req.params.id.slice(5);
  res.download(path.join(__dirname, 'uploads/user-documents/'+file_name));
})

app.post("/api/delete-announcements/:id",async (req,res)=>{
  const AnId = req.params.id;
  const deleteAn = await Announcement.deleteOne({_id:AnId});
  const newUrl = req.user.house_number=="admin"?"/admin/announcements":"/announcements";
  res.redirect(frontenddomain+newUrl);
})

app.post("/api/delete-bill/:id",async (req,res)=>{
  const bill_number = req.params.id.slice(0,5)=="admin"?req.params.id.slice(5):req.params.id.slice(3);
  const house_number = req.params.id.slice(0,5)!="admin"?req.params.id.slice(0,3):req.params.id.slice(0,5);
  await Bill.deleteOne({bill_number:bill_number,house_number:house_number});
  const newUrl = req.user.house_number=="admin"?"/admin/payments":"/payments";
  res.redirect(frontenddomain+newUrl);
})

app.post("/api/admin/payments/:id",async (req,res)=>{
  const house_number = req.params.id.slice(0,3);
  const bill_number = req.params.id.slice(3);
  const getData = await Bill.findOne({house_number:house_number,bill_number:bill_number});
  const edittedData = {
    house_number:house_number,
    bill_number:bill_number,
    deadline: req.body.deadline||getData.deadline,
    amount: req.body.amount||getData.amount,
    pending:getData.pending,
    type:req.body.type||getData.type
  }
  await Bill.updateOne({house_number:house_number,bill_number:bill_number},edittedData);
  res.redirect(frontenddomain+"/admin/payments");
})

app.post("/api/add-bill",async (req,res)=>{
  var bill_number = "";
  var transaction_id = "";
  for(var i=0;i<5;i++){
    bill_number += Math.floor(Math.random()*10);
  }
  for(var i=0;i<5;i++){
    transaction_id += Math.floor(Math.random()*10);
  }
  for(var i=0;i<req.body.selectedOptions.length;i++){
    const NewBill = new Bill({
      bill_number:bill_number,
      house_number:req.body.selectedOptions[i].value,
      amount:req.body.amount,
      pending:true,
      deadline:req.body.deadline,
      type:req.body.type,
      transaction_id:transaction_id
    })
    await NewBill.save();
  }
  res.redirect(frontenddomain+"/admin/payments");
})

app.post("/api/payment-verified/:id",async (req,res)=>{
  console.log("Payment confirmed...");
  const house_number = req.params.id.slice(0,3);
  const bill_number = req.params.id.slice(3);
  await Bill.updateOne({house_number:house_number,bill_number:bill_number},{pending:false});
  res.redirect(frontenddomain+"/payments");
})

app.post("/api/generate-receipt/:id",async (req,res)=>{
  const house_number = req.params.id.slice(0,3);
  const bill_number = req.params.id.slice(3);
  const date = new Date();
  const billDetails = await Bill.findOne({house_number:house_number,bill_number:bill_number});
  const userDetails = await User.findOne({house_number:house_number});
  const receiptData = {
    name:userDetails.name,
    bill_number:billDetails.bill_number,
    type:billDetails.type,
    house_number:house_number,
    datePaid:date.toLocaleDateString(),
    amount:billDetails.amount,
    mobile_number:userDetails.mobile_number,
    transaction_id:billDetails.transaction_id
  }

  generateReceipt(receiptData,path.join(__dirname, 'uploads/bills/'+req.params.id+".pdf"),()=>{  res.download(path.join(__dirname, 'uploads/bills/'+req.params.id+".pdf"));});
})

app.post("/api/delete-account",async (req,res)=>{
  if(req.isAuthenticated()){
    await User.deleteOne({house_number:req.user.house_number});
    await Token.deleteMany({house_number:req.user.house_number});
    const ImageDetails = await ProfileImage.findOne({house_number:req.user.house_number});
    fs.unlink(path.join(__dirname,`uploads/${ImageDetails.image}`), async (err) => {
      if (err) {
        console.log(err);
        return res.status(500).send('Error deleting file');
      }
    })
    await ProfileImage.deleteOne({house_number:req.user.house_number});
  }
  req.logOut((err)=>{
    if(err){
      return next(err);
    }
    res.redirect(frontenddomain+"/");
  })
})

app.post("/api/add-user",async (req,res)=>{
  const name = req.body.name;
  const house_number = req.body.house_number;
  const email = req.body.email;
  const mobile_number = req.body.mobile_number;
  const password = req.body.password;
  const reenter_password = req.body.reenter_password;
  if(password==reenter_password){
    if(house_numbers.includes(house_number)==true){
      try{
        const checkResult = await User.findOne({house_number:house_number});
        if(checkResult!=null){
          res.redirect(frontenddomain+"/");
        }
        else{
          bcrypt.hash(password,saltRounds,async (err,hash)=>{
            if(err){
              console.log(err);
            }
            else{
              const addUser = new User({
                name:name,
                house_number:house_number,
                email:email,
                mobile_number:mobile_number,
                password:hash,
              });
              addUser.save();
              const { token, expires } = generateToken(60);
              const resetToken = new Token({ type:"authToken",house_number:house_number, token, expires });
              await resetToken.save();
              if(name=="admin"||house_number=="admin"){
                res.redirect(frontenddomain+"/admin/announcements");
              }
              else{
                res.redirect(frontenddomain+"/announcements");
              }
            }
          })
        }
      }
      catch(err){
        console.log(err);
      }
    }
    else{
      res.send("Invalid house number");
    }
  }
  else{
    res.send("Re-entered password does not match the password entered initially");
  }
})

app.post("/api/forgot-password",async (req,res)=>{
  const house_number = req.body.house_number;
  const findUser = await User.findOne({house_number:house_number});
  if(findUser!=null){
    const { token, expires } = generateToken(60);
    const resetToken = new Token({ type:"reset-password",house_number, token, expires });
    await resetToken.save();
    const Link = `${frontenddomain}/reset-password/${house_number}${token}`;
    console.log(Link);
    sendMail(findUser.email,
      "RESET PASSWORD FOR YOUR SOWGANDHIKA APARTMENT ACCOUNT",
      `Click on this link to reset your password: ${Link}`,
      `<p>Click on this link to reset your password: <a href="${Link}">${Link}</a></p>`
    );
    res.redirect(frontenddomain+"/");
  }
  else{
    res.send("User does not exist.");
    res.redirect(frontenddomain+"/sign-up");
  }
})

app.post("/api/reset-password/:id",async (req,res)=>{
  const house_number = req.params.id.slice(0,3);
  const token = req.params.id.slice(3);
  console.log(house_number);
  console.log(token);
  const newPassword = req.body.password;
  const newReenter_Password = req.body.reenter_password;
  const resetToken = await Token.findOne({house_number:house_number,token:token});

  if (!resetToken) {
    return res.status(400).send("Invalid token");
  }

  if (Date.now() > resetToken.expires) {
    await Token.deleteOne({ house_number:house_number, token:token});
    return res.status(400).send("Token has expired");
  }

  if(newPassword==newReenter_Password){
    try{
      bcrypt.hash(newPassword,saltRounds,async (err,hash)=>{
        if(err){
          console.log(err);
        }
        else{
          const update = await User.findOneAndUpdate({house_number:house_number},{password:hash});
          res.redirect(frontenddomain+"/");
        }
        })
      const deleteToken = await Token.deleteOne({house_number:house_number, token: req.params.id.slice(3)});
      console.log(deleteToken);
    }
    catch(err){
      console.log(err);
    }
  }
  else{
    res.send("Re-entered password does not match the password entered initially")
  }
})

passport.use("local",new Strategy({usernameField: 'house_number',passwordField: 'password'},
  async function verify(house_number,password,cb){
  try{
    const user = await User.findOne({house_number:house_number});
    if(user!=null){
      const storedhashedPassword = user.password;
      bcrypt.compare(password,storedhashedPassword,(err,result)=>{
        if(err){
          return cb(err);
        }
        else{
          if(result){
            return cb(null,user);
          }
          else{
            return cb(null,false);
          }
        }
      })
    }
    else{
      return cb("User not found");
    }
  }
  catch(err){
    return cb("User not found");
  }
}))

app.post("/api/check-user",(req,res,next)=>{
  const redirect_url = req.body.house_number=="admin"?"/admin/announcements":"/announcements";
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      console.error('Error during authentication:', err);
      return next(err);
    }
    if (!user) {
      console.log('Authentication failed:', info);
      return res.redirect(frontenddomain+'/');
    }
    req.logIn(user, async (err) => {
      if (err) {
        console.error('Error during login:', err);
        return next(err);
      }
      console.log('Authentication successful, redirecting to:', redirect_url);
      const { token, expires } = generateToken(60);
      const resetToken = new Token({ type:"authToken",house_number:user.house_number, token, expires });
      await resetToken.save();
      return res.redirect(frontenddomain+redirect_url);
    });
  })(req, res, next);
});

passport.serializeUser((user,cb)=>{
  cb(null,user);
})

passport.deserializeUser((user,cb)=>{
  cb(null,user);
})

app.listen(port,()=>{
    console.log(`The server is running on http://localhost:${port}`);
})

export default app;

