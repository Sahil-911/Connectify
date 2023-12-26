import { ContactModel } from "../models/Contact.model";
import { FilterQuery } from 'mongoose';
import { createMessage } from "./message.service";

export const getContactUser1User2 = async (userId1: string, userId2: string) => {
    const query: FilterQuery<any> = {
        $or: [
            { from: userId1, to: userId2 },
            { from: userId2, to: userId1 }
        ]
    };

    const contact = await ContactModel.findOne(query).exec();
    console.log('contact', contact);
    return contact?._id;
};

export const createContact = async (userId1: string, userId2: string) => {
    const newContact = await ContactModel.create({
        from: userId1,
        to: userId2,
        messagesfrom: [],
        messagesto: [],
    });
    return newContact;
}

export const storeNewMessageInContact = async (userId1: string, userId2: string, messageContent: string) => {
    const contactExists = await getContactUser1User2(userId1, userId2);

    if (contactExists) {
        const contact = await ContactModel.findById(contactExists).exec();

        // Create a new message
        const newMessage = await createMessage(userId1, messageContent);

        if (contact?.from?.toString() === userId1?.toString()) {
            contact.messagesfrom.push(newMessage);
            await contact?.save();
        } else if (contact?.to?.toString() === userId1?.toString()) {
            contact?.messagesto.push(newMessage);
            await contact?.save();
        }

        return newMessage; // Return the newly created message if needed
    } else {

        // Create a new contact
        const newContact = await createContact(userId1, userId2);

        // Create a new message
        const newMessage = await createMessage(userId1, messageContent);

        // Add the new message's ID to the new contact
        newContact.messagesfrom.push(newMessage);
        await newContact.save();

        return newMessage; // Return the newly created message if needed
    }
}