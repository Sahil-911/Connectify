import { Schema } from 'mongoose';
import { contactInput } from '@/types/Contact.interface';
import { model } from 'mongoose';

const contactSchema = new Schema<contactInput>({
    from: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    to: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    messagesfrom: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Message',
        }
    ],
    messagesto: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Message',
        }
    ],
});

export const ContactModel = model<contactInput>("Contact", contactSchema);