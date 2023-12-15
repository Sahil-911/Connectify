import { Conversation, ConversationDocument } from '@/types/Conversation.interface';
import mongoose, { Schema, Model, Document } from 'mongoose';
import { User } from '@/types/User.interface';
import { Message } from '@/types/Message.interface';

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

// // Define the ConversationModel with correct typings
// export const ConversationModel: Model<ConversationDocument> = mongoose.model<
//     ConversationDocument
// >("Conversation", conversationSchema);

// // Define the ConversationDocument with correct typings
// export type ConversationDocument = Conversation & Document;

// Define the ConversationInput with correct typings
export type ConversationInput = Omit<Conversation, 'createdAt' | 'updatedAt'>;
// Define the ConversationPopulated with correct typings
export type ConversationPopulated = Omit<Conversation, 'participants' | 'messages'> & {
    participants: User[];
    messages: Message[];
};
// Define the ConversationPopulatedDocument with correct typings
export type ConversationPopulatedDocument = ConversationPopulated & Document;