import { userSchema } from "../db/user";


import mongoose from "mongoose";

export const UserModel = mongoose.model("User", userSchema);