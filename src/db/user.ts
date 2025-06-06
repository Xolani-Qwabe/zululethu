import mongoose from 'mongoose';

export const userSchema = new mongoose.Schema({
    username: { type: String, required : true},
    email: { type: String, required: true, unique: true },          
    authentication:{
        password: { type: String, required: true, select: false },
        salt: { type:String, select: false },
        sessionToken: { type: String, select: false },
    },
})

