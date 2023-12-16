import { Conversation } from '@/types/Conversation.interface';
import { Schema, model } from 'mongoose';

const conversationSchema = new Schema<Conversation>({
    conversationId: {
        type: String,
        required: true,
        unique: true,
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

// Define the ConversationModel with correct typings
export const ConversationModel = model<Conversation>("Conversation", conversationSchema);