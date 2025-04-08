import { Request, Response } from 'express';
import session from 'express-session';
import dotenv from 'dotenv';
dotenv.config();
import { UserModel } from '../models/user';
import { generateSalt, hashPassword } from '../helpers/authHelpers';
import { createUser, getUserByEmail } from './userController';


export const register = async (req: Request, res: Response) => {
    try {
       const {email , password, username} = req.body;
       if (!email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        const existingUser = await getUserByEmail(email);
        if (existingUser){
            return res.status(400).json({ message: 'User already exists' });
        }
        const salt = generateSalt();
        const hashedPassword = hashPassword(password, salt);
        const newUser = await createUser({
            email, 
            authentication :{
                password: hashedPassword,
                salt
            },
            username: email.split("@")[0] , 
            });
        return res.status(201).json({ message: 'User registered successfully', user: newUser });
    } catch (error) {
        throw new Error('Error registering user: ' + error);
    }
};

