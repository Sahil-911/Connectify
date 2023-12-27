import { ObjectId } from 'mongoose';
import { User } from '@/types/User.interface';
import { Message } from '@/types/Message.interface';

export interface GroupChatInput {
    name: string;
    admin: String | User;
    description: string;
    participants: string[] | User[];
    messages: string[] | Message[];
}

export interface GroupChatInputWithId extends GroupChatInput {
    _id: string;
}

export type groupChat = GroupChatInputWithId