import { Message, MessageInputWithId } from '@/types/Message.interface';
import { Schema, Model, model, models } from 'mongoose';

const messageSchema = new Schema<MessageInputWithId>({
    sender: {
        type: String || Schema.Types.ObjectId,
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

export const MessageModel: Model<Message> = models["Message"] ?? model<Message>("Message", messageSchema);

// // Create specific models for TextMessage and ImageMessage (if needed)
// export const TextMessageModel: Model<TextMessage> = MessageModel.discriminator<TextMessage>(
//     'TextMessage',
//     new Schema({
//         messageType: { type: String, default: 'text' },
//     })
// );

// export const ImageMessageModel: Model<ImageMessage> = MessageModel.discriminator<ImageMessage>(
//     'ImageMessage',
//     new Schema({
//         messageType: { type: String, default: 'image' },
//         imageUrl: { type: String, required: true },
//     })
// );
