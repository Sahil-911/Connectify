import { ObjectId } from 'mongoose';
import { User } from '@/types/User.interface';
import { Message } from '@/types/Message.interface';

export interface GroupChat {
    chatId: string;
    name: string;
    participants: User[];
    messages: Message[];
    createdAt: Date;
    updatedAt: Date;
}

export type GroupChatDocument = GroupChat & { _id: ObjectId };