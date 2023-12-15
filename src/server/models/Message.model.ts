import { MessageInput, TextMessage, ImageMessage, Message, MessageType } from '@/types/Message.interface';
import mongoose, { Schema, Model, model } from 'mongoose';

const messageSchema = new Schema<MessageInput>({
    messageId: {
        type: String,
        required: true,
        unique: true,
    },
    sender: {
        type: Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
        required: true,
    },
    receiver: {
        type: Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    timestamp: {
        type: Date,
        required: true,
        default: Date.now,
    },
});

// Create the Mongoose model for the general Message schema
export const MessageModel: Model<MessageInput> = model<MessageInput>("Message", messageSchema);

// Create specific models for TextMessage and ImageMessage (if needed)
export const TextMessageModel: Model<TextMessage> = MessageModel.discriminator<TextMessage>(
    'TextMessage',
    new Schema({
        messageType: { type: String, default: 'text' },
    })
);

export const ImageMessageModel: Model<ImageMessage> = MessageModel.discriminator<ImageMessage>(
    'ImageMessage',
    new Schema({
        messageType: { type: String, default: 'image' },
        imageUrl: { type: String, required: true },
    })
);
