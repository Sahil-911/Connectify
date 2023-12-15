import { ObjectId } from 'mongoose';
import { User } from '@/types/User.interface';

export interface MessageInput {
    messageId: string;
    sender: User;
    receiver: User;
    content: string;
    timestamp: Date;
}

export interface TextMessage extends MessageInput {
    messageType: 'text';
}

export interface ImageMessage extends MessageInput {
    messageType: 'image';
    imageUrl: string;
}

export type MessageType = TextMessage | ImageMessage;

export type Message = MessageType & { _id: ObjectId };