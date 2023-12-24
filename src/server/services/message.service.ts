import { MessageModel } from "../models/Message.model";
import { ContactModel } from "../models/Contact.model";
import { getContactUser1User2 } from "./contact.service";

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
        return allMessages;
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

export const createMessage = async (userId1: string, userId2: string, message: string) => {
    const newMessage = await MessageModel.create({
        sender: userId1,
        content: message,
        timestamp: Date.now()
    })
    return newMessage;
}