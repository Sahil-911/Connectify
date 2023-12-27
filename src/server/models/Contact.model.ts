import { Model, Schema, models } from 'mongoose';
import { contact, contactInputWithId } from '@/types/Contact.interface';
import { model } from 'mongoose';

const contactSchema = new Schema<contactInputWithId>({
    from: {
        type: String || Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    to: {
        type: String || Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    messagesfrom: [
        {
            type: String || Schema.Types.ObjectId,
            ref: 'Message',
        }
    ],
    messagesto: [
        {
            type: String ||  Schema.Types.ObjectId,
            ref: 'Message',
        }
    ],
});

export const ContactModel: Model<contact> = models["Contact"] ?? model<contact>("Contact", contactSchema);