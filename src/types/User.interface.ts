import { ObjectId } from 'mongoose';

export interface UserInput {
    name: string;
    username: string;
    email: string;
    password: string;
    bio?: string;
    gender: string;
    connections?: User[];
    pendingConnections?: User[];
    connectionRequests?: User[];
}

export type User = UserInput;
