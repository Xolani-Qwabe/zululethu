import mongoose from 'mongoose';

const MONGODB_CONNECTION_STRING = process.env.MONGODB_CONNECTION_STRING || "mongodb+srv://Xolani_Qwabe:Azineqwabe01@zululethu.xk8kbbv.mongodb.net/?retryWrites=true&w=majority&appName=Zululethu";

export const connectToDatabase = async (): Promise<void> => {
    try {
        mongoose.Promise = Promise; 
        await mongoose.connect(MONGODB_CONNECTION_STRING);
        console.log("MongoDB connection established successfully.");
    } catch (error) {
        console.error("MongoDB connection error:", error);
        process.exit(1); // Exit the process if the connection fails
    }

    mongoose.connection.on("error", (error: Error) => {
        console.error("MongoDB runtime connection error:", error);
    });
};