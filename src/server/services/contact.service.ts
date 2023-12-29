import { ContactModel } from "../models/Contact.model";
import { FilterQuery } from 'mongoose';
import { createMessage } from "./message.service";
import { MessageInputWithId } from "@/types/Message.interface";
import { MessageModel } from "../models/Message.model";

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
            contact.messagesfrom.push(newMessage._id.toString() as string & MessageInputWithId); // Access the _id property of newMessage
            await contact?.save();
        } else if (contact?.to?.toString() === userId1?.toString()) {
            contact?.messagesto.push(newMessage._id as string & MessageInputWithId); // Access the _id property of newMessage
            await contact?.save();
        }

        newMessage._id = newMessage._id.toString();
        newMessage.sender = newMessage.sender.toString();
        return newMessage.toJSON(); // Return the newly created message if needed
    } else {

        // Create a new contact
        const newContact = await createContact(userId1, userId2);

        // Create a new message
        const newMessage = await createMessage(userId1, messageContent);

        // Add the new message's ID to the new contact
        newContact.messagesfrom.push(newMessage._id as string & MessageInputWithId);
        await newContact.save();

        newMessage._id = newMessage._id.toString();
        newMessage.sender = newMessage.sender.toString();
        return newMessage.toJSON(); // Return the newly created message if needed
    }
}


export const getLatestMessageForContact = async (userId1: string, userId2: string) => {
    const query: FilterQuery<any> = {
        $or: [
            { from: userId1, to: userId2 },
            { from: userId2, to: userId1 }
        ]
    };

    const contact = await ContactModel.findOne(query).exec();

    const lastMessageFromId = contact?.messagesfrom[contact?.messagesfrom.length - 1];
    const lastMessageToId = contact?.messagesto[contact?.messagesto.length - 1];

    if (!lastMessageFromId && !lastMessageToId) {
        return null; // No messages found
    }

    // Fetch the actual message based on ID
    const lastMessageFrom = lastMessageFromId ? await MessageModel.findById(lastMessageFromId) : null;
    const lastMessageTo = lastMessageToId ? await MessageModel.findById(lastMessageToId) : null;

    // Get the content and timestamp of the last message
    let content = '';
    let timestamp = null;

    if (lastMessageFrom && lastMessageTo) {
        const fromTimestamp = lastMessageFrom.timestamp.getTime();
        const toTimestamp = lastMessageTo.timestamp.getTime();
        if (fromTimestamp > toTimestamp) {
            content = lastMessageFrom.content;
            timestamp = lastMessageFrom.timestamp;
        } else {
            content = lastMessageTo.content;
            timestamp = lastMessageTo.timestamp;
        }
    } else if (lastMessageFrom) {
        content = lastMessageFrom.content;
        timestamp = lastMessageFrom.timestamp;
    } else if (lastMessageTo) {
        content = lastMessageTo.content;
        timestamp = lastMessageTo.timestamp;
    }

    return { content, timestamp };
};
