import { User } from '@/types/User.interface';
import { Schema, Model, model, models } from 'mongoose';

const userSchema = new Schema<User>({
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
        required: true,
    },
    connections: [{
        type: String || Schema.Types.ObjectId,
        ref: 'User',
    }],
    pendingConnections: [{
        type: String || Schema.Types.ObjectId,
        ref: 'User',
    }],
    connectionRequests: [{
        type: String || Schema.Types.ObjectId,
        ref: 'User',
    }],
    groupMemberOf: [{
        type: String || Schema.Types.ObjectId,
        ref: 'GroupChat',
        required: true
    }],
});

export const UserModel: Model<User> = models["User"] ?? model<User>("User", userSchema);