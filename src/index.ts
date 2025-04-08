import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import session from 'express-session'; 

import { connectToDatabase } from "./config/db";
import authRouter from './routes/authRoutes';

// Load environment variables
dotenv.config();

const app = express();



// Enable CORS for all routes and origins with credentials support
app.use(cors({
    credentials: true,
    // To restrict origin in production uncomment the line below and set the CLIENT_URL to your frontend URL:
    // origin: process.env.CLIENT_URL || 'http://localhost:3000'
}));

// Enable Gzip compression for all responses
app.use(compression());

// Parse cookies
app.use(cookieParser());

// Parse JSON request bodies (limit size)
app.use(bodyParser.json({ limit: "50mb" }));

// --- Session Middleware 
app.use(session({
  
    secret: process.env.SESSION_SECRET || 'session_secret_key', 
    resave: false, 
    saveUninitialized: false, 
    cookie: {
        secure: process.env.NODE_ENV === 'production', 
        httpOnly: true, 
        maxAge: 1000 * 60 * 60 * 24 // Cookie expires in 1 day
       
    }

}));


// --- Router Setup ---
const apiRouter = express.Router(); 

// Configure authentication routes using the imported function

app.use('/api/auth', authRouter);

// Add other routers here if needed (e.g., userRoutes, productRoutes, blogRoutes, etc.)

app.use('/api', apiRouter);


// --- Server Initialization ---
const server = http.createServer(app); 

const PORT = process.env.PORT || 8080;

server.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
    connectToDatabase();
});

// Basic error handling middleware (add AFTER routes)
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error("Unhandled error:", err);
    res.status(500).json({ message: "Internal Server Error" });
});
