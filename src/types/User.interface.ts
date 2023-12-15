import { ObjectId } from 'mongoose';

export interface UserInput {
    name: string;
    username: string;
    email: string;
    password: string;
    bio?: string;
    gender: 'm' | 'f' | 'o';
    createdAt: Date;
    updatedAt: Date;
}

export type User = UserInput & { _id: ObjectId };
