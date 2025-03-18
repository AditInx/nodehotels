import mongoose from "mongoose";
import { config } from "dotenv";
config();
const mongoURL = process.env.mongoURL;
mongoose.connect(mongoURL);

const db = mongoose.connection;

db.on('connected',()=>{
    console.log("connected to mongodb server");
})

db.on('error',(err)=>{
    console.log("MongoDB connection error: ",err);
})

db.on('disconnected',()=>{
    console.log("MongoDB disconnected");
})

export default db;