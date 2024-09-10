import mongoose, { Schema } from "mongoose";


const UserShema = new Schema({

    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    createAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        default: Date.now()
    }
    ,
    rule:{
        type: Number,
        default: 1
    }
});

const UserModel=mongoose.model("users",UserShema);
export default UserModel