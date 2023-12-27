import { User } from "./User.interface";

export interface MessageInput {
    sender: string | User;
    content: string;
    timestamp: Date;
}

export interface MessageInputWithId extends MessageInput {
    _id: string;
}

export interface TextMessage extends MessageInput {
    messageType: 'text';
}

export interface ImageMessage extends MessageInput {
    messageType: 'image';
    imageUrl: string;
}

export type MessageType = TextMessage | ImageMessage;

export type Message = MessageInputWithId;