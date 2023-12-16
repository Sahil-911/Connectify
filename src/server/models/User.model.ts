import { UserInput } from '@/types/User.interface';
import { Schema, Model, model } from 'mongoose';

const userSchema = new Schema<UserInput>({
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    bio: {
        type: String,
    },
    gender: {
        type: String,
        enum: ['m', 'f', 'o'],
        required: true,
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        required: true,
        default: Date.now
    },
});

export const UserModel: Model<UserInput> = model<UserInput>("User", userSchema);
