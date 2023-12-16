import { GroupChat } from '@/types/GroupChat.interface';
import { Schema, model } from 'mongoose';

const groupChatSchema = new Schema<GroupChat>({
    chatId: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    participants: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User', // Reference to the User model
            required: true,
        },
    ],
    messages: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Message', // Reference to the Message model
        },
    ],
    createdAt: {
        type: Date,
        required: true,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        required: true,
        default: Date.now,
    },
});

export const GroupChatModel = model<GroupChat>('GroupChat', groupChatSchema);