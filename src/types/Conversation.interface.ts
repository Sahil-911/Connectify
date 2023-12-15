import { ObjectId } from 'mongoose';
import { User } from '@/types/User.interface';
import { Message } from '@/types/Message.interface';

export interface Conversation {
    conversationId: string;
    participants: User[];
    messages: Message[];
    createdAt: Date;
    updatedAt: Date;
}

export type ConversationDocument = Conversation & { _id: ObjectId };