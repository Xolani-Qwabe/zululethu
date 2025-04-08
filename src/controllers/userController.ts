
// File: src/controllers/userController.ts
// Description: This file contains the user controller which handles the logic for user-related routes.
import { UserModel } from '../models/user';


interface IUser {
    email: string;
    username: string;
    authentication: {
        password: string;
        salt: string;
    };
}


export const getUsers = async () => {
    try {
        return await UserModel.find({});
    } catch (error) {
       throw new Error('Error fetching users' + error);
    }
}

export const getUserById = async (id:string) => {
    try {
        const user = await UserModel.findById(id);
        if (!user) {
            throw Error('User not found');
        }
        return user;
    } catch (error) {
        throw Error('Error fetching user' + error);
    }
}

export const getUserByEmail = async (email:string) => {
    try {
        const user = await UserModel.findOne({email });
        if (!user) {
         throw Error('User not found');
        }
        return user;
    } catch (error) {
      throw  Error('Error fetching user') ;
    }
}

export const createUser = async (values: <IUser>): Promise<IUser> => {
    try {
        if (values.username == null) {
            values.username = values.email.split("@")[0]; // Default to the email prefix
        } else if (values.username === undefined) {
            values.username = undefined; 
        }
        const user = new UserModel(values);
        const savedUser = await user.save();

        if (!savedUser) {
            throw Error('Could not save user');
        }
        const userObject = savedUser.toObject();
        if (userObject.username === null) {
            userObject.username = undefined;
        }
        return userObject;
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
};

export const deleteUserById = async (id:string) => {
    try {
        const user = await UserModel.findByIdAndDelete(id);
        if (!user) {
            throw Error('User not found');
        }
        return user;
    } catch (error) {
        throw new Error('Error deleting user' + error);
    }
}     

export const updateUserById = async (id:string, values: Record<string, any>) => {   
        try {
            const newUser = (values: Record<string, any>) => {
                return UserModel.findByIdAndUpdate(id, values, { new: true });  
            }
            const user = await newUser(values);
        } catch (error) {   
            throw new Error('Error updating user' + error);
    }
}





