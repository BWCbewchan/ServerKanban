import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Types } from 'mongoose';

dotenv.config();

// Define the type for the payload
interface Payload {
    _id: Types.ObjectId;
    email: string;
    rule?: number;  // Optional, as indicated by ?
}

export const getAccessToken = async (payload: Payload) => {
    // Ensure that SECRET_KEY is properly defined in your .env file
    if (!process.env.SECRET_KEY) {
        throw new Error('SECRET_KEY is not defined in the environment variables');
    }

    const token = jwt.sign(payload, process.env.SECRET_KEY
        // , { expiresIn: 60 }
    );
    return token;
};
