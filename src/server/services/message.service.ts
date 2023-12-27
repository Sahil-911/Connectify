import { MessageModel } from "../models/Message.model";
import { ContactModel } from "../models/Contact.model";
import { getContactUser1User2 } from "./contact.service";
import { GroupChatModel } from "../models/GroupChat.model";
import { Message } from "@/types/Message.interface";

export const getMessagesUser1User2 = async (userId1: string, userId2: string) => {
    console.log('getMessageu1u2', userId1, userId2);
    const contactId = await getContactUser1User2(userId1, userId2);
    const contact = await ContactModel.findById(contactId);
    if (contact) {
        const messageIdsFrom = contact.messagesfrom;
        const messageIdsTo = contact.messagesto;

        const messagesFromPromise = MessageModel.find({ _id: { $in: messageIdsFrom } }).exec();
        const messagesToPromise = MessageModel.find({ _id: { $in: messageIdsTo } }).exec();

        const [messagesFrom, messagesTo] = await Promise.all([messagesFromPromise, messagesToPromise]);
        const allMessages = messagesFrom.concat(messagesTo).sort((a, b) => {
            return a.timestamp.getTime() - b.timestamp.getTime();
        });

        console.log('all..', allMessages);

        // Convert all messages to JSON format
        const messagesJSON = allMessages.map((message) => message.toJSON());

        return messagesJSON;
    }
    console.log('no contact found');
    return []; // Return an empty array if no contact or messages are found
};

// export const getMessagesUser1User2WithLimit = async (userId1: string, userId2: string, limit: number) => {
//     const contactId = await getContactUser1User2(userId1, userId2);
//     const contact = await ContactModel.findById(contactId);
//     if (contact) {
//         const messageIdsFrom = contact.messagesfrom;
//         const messageIdsTo = contact.messagesto;

//         const messagesFromPromise = MessageModel.find({ _id: { $in: messageIdsFrom } }).limit(limit).exec();
//         const messagesToPromise = MessageModel.find({ _id: { $in: messageIdsTo } }).limit(limit).exec();

//         const [messagesFrom, messagesTo] = await Promise.all([messagesFromPromise, messagesToPromise]);
//         const allMessages = messagesFrom.concat(messagesTo);

//         console.log('all..', allMessages);
//         return allMessages;
//     }
//     console.log('no contact found');
//     return []; // Return an empty array if no contact or messages are found
// };

export const createMessage = async (userId: string, message: string) => {
    try {
        const newMessage = await MessageModel.create({
            sender: userId.toString(),
            content: message,
            timestamp: Date.now()
        });
        newMessage._id = newMessage._id.toString(); // Convert _id to string
        return newMessage; // Return the newMessage object directly without calling toJSON()
    } catch (error: any) {
        console.error('Error creating message:', error);
        throw new Error('Failed to create message: ' + error.message);
    }
};


export const getMessagesGC = async (groupId: string) => {
    const group = await GroupChatModel.findById(groupId);
    if (group) {
        const messageIds = group.messages;
        const messages = await MessageModel.find({ _id: { $in: messageIds } }).exec();
        console.log('messages service', messages)
        return messages;
    }
    console.log('wth', group);
    return [];
}