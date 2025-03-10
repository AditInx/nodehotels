import mongoose from "mongoose";

const personSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true,
    },
    age: {
        type:Number
    },
    work:{
        type:String,
        enum:['waiter','chef','manager'],
        required: true
    },
    mobile:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required: true,
        unique: true
    },
    address:{
        type: String,
        required: true
    },
    salary:{
        type: Number,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password:{
        type:String,
        required: true
    }
})


// Create Person Model

const Person = mongoose.model('Person',personSchema);
export {Person};