const { required } = require("joi");
const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
    firstname: {
        type: String,
        trim: true,
        required: [, "Firstname is required"],


    },
    lastname :{
        type: String,
        trim: true,
        required: [true, "Lastname is required"],

    },
    age: {
        type: Number,
        required: [true, "Age is required"]
    },
    gender: {
        type: String,
        enum: {
            values: ["male", "female"],
            message: "Invalid gender"
        },
        required: true,
        trim: true,
    },
    phone_num: {
        type: String,
        trim: true,
        match: [/^9989[012345789][0-9]{7}$/, "Invalid phone number"],
        required: true
    }
    ,
    email: {
        type: String,
        trim: true,
        match: [ /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i, "Invalid format"] ,
        required: true,
        unique: [true, "User already exsist"]
    },
    password: {
        type: String,
        required: true,
    }

},{
    versionKey: false,
    timestamps: true
})
module.exports = model("users", UserSchema)