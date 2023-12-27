import { GroupChatInputWithId, groupChat } from '@/types/GroupChat.interface';
import { Model, Schema, model, models } from 'mongoose';

const groupChatSchema = new Schema<GroupChatInputWithId>({
    name: {
        type: String,
        required: true,
    },
    admin: {
        type: String || Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
        required: true,
    },
    description: {
        type: String
    },
    participants: [
        {
            type: String || Schema.Types.ObjectId,
            ref: 'User', // Reference to the User model
            required: true,
        },
    ],
    messages: [
        {
            type:  String || Schema.Types.ObjectId,
            ref: 'Message', // Reference to the Message model
        },
    ],
});

export const GroupChatModel: Model<groupChat> = models["GroupChat"] ?? model<groupChat>("GroupChat", groupChatSchema);