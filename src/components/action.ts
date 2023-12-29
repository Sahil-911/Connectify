'use server';

import { SessionInterface } from "@/context/session";
import { verifyToken } from "@/server/services/auth.service";
import { getLatestMessageForContact, storeNewMessageInContact } from "@/server/services/contact.service";
import { getMessagesUser1User2 } from "@/server/services/message.service";
import { connectByIdRequest, disconnectByIdWithdrawal, getNameOfConnections, getUserById } from "@/server/services/user.service";

export async function FetchProfile(session: SessionInterface) {
    console.log(session);
    try {
        const { id } = verifyToken(session);
        const profile = await getUserById({ id });
        console.log(profile);
        if (profile)
            console.log('to pa6i hu 6e', profile)
        return {
            profile: {
                _id: profile?._id.toString(),
                username: profile?.username,
                name: profile?.name,
                email: profile?.email,
                bio: profile?.bio,
                gender: profile?.gender,
                connections: profile?.connections?.toString(),
                pendingConnections: profile?.pendingConnections?.toString(),
                connectionRequests: profile?.connectionRequests?.toString(),
                groupMemberOf: profile?.groupMemberOf?.toString(),
            }, message: 'profile fetched successfully'
        };
    }
    catch (err: any) {
        console.log('error', err.message);
        return { profile: null, message: err.message }
    }
}

export async function ConnectById(session: SessionInterface, id: string) {
    console.log('connecting...', id);
    try {
        const { id: userId } = verifyToken(session);
        if (!userId) throw new Error('Invalid token');
        if (userId === id) throw new Error('Cannot connect to self');
        const message = await connectByIdRequest(userId, id);
        console.log('almost...');
        return { message: message };
    }
    catch (err: any) {
        return { message: err.message }
    }
}

export async function DisconnectById(session: SessionInterface, id: string) {
    console.log('disconnecting...', id);
    console.log(session);
    try {
        const { id: userId } = verifyToken(session);
        if (!userId) throw new Error('Invalid token');
        if (userId === id) throw new Error('Cannot do withdrawal from self');
        const message = await disconnectByIdWithdrawal(userId, id);
        console.log('dissconnected hehe');
        return { message: message };
    }
    catch (err: any) {
        console.log('error', err.message)
        return { message: err.message }
    }
}

// export async function GetNameOfConnections(session: SessionInterface) {
//     console.log('getting names of connections...');
//     try {
//         const { id: userId } = verifyToken(session);
//         if (!userId) throw new Error('Invalid token');
//         const contacts: { _id: any; name: any; username: any; }[] = await getNameOfConnections(userId);
//         console.log('contacts');
//         contacts.forEach(contact => {
//             contact._id = contact._id.toString();
//         });
//         return { contacts, message: 'contacts fetched successfully' };
//     }
//     catch (err: any) {
//         console.log('error', err.message)
//         return { message: err.message }
//     }
// }

export async function GetNameOfConnections(session: SessionInterface) {
    console.log('getting names of connections...');
    try {
        const { id: userId } = verifyToken(session);
        if (!userId) throw new Error('Invalid token');
        const contacts: { _id: any; name: any; username: any; }[] = await getNameOfConnections(userId);
        console.log('contacts');

        // Retrieve the latest message for each contact
        const contactsWithLatestMessages = await Promise.all(
            contacts.map(async (contact) => {
                try {
                    const latestMessage = await getLatestMessageForContact(userId, contact._id);
                    return {
                        _id: contact._id.toString(),
                        name: contact.name,
                        username: contact.username,
                        latestMessage: latestMessage ? latestMessage : null
                    };
                } catch (error) {
                    // Handle errors while fetching the latest message for a contact
                    return {
                        _id: contact._id.toString(),
                        name: contact.name,
                        username: contact.username,
                        latestMessage: null
                    };
                }
            })
        );

        // Sort contacts based on the timestamp of the latest message (if available)
        const sortedContacts = contactsWithLatestMessages.sort((a, b) => {
            const timestampA = a.latestMessage?.timestamp?.getTime() || 0;
            const timestampB = b.latestMessage?.timestamp?.getTime() || 0;

            return timestampB - timestampA; // Sort in descending order based on the timestamp
        });

        // Extract only the content of the last message for each contact
        const contactsContent = sortedContacts.map((contact) => {
            return {
                _id: contact._id,
                name: contact.name,
                username: contact.username,
                latestMessage: contact.latestMessage ? contact.latestMessage.content : null
            };
        });

        return { contacts: contactsContent, message: 'contacts fetched successfully' };
    } catch (err: any) {
        console.log('error', err.message);
        return { message: err.message };
    }
}


export async function GetMessagesUser1User2(session: SessionInterface, id: string) {
    console.log('getting messages between user1 and user2...');
    try {
        const { id: userId } = verifyToken(session);
        if (!userId) throw new Error('Invalid token');
        const chats = await getMessagesUser1User2(id, userId);
        console.log('contacts');
        chats.forEach(chat => {
            chat._id = chat._id.toString();
            chat.sender = chat.sender.toString();
        })
        return { chats, message: 'contacts fetched successfully' };
    }
    catch (err: any) {
        console.log('error', err.message)
        return { message: err.message }
    }
}

export async function StoreNewMessageInContact(session: SessionInterface, id: string, message: string) {
    console.log('storing new message in contact...');
    try {
        const { id: userId } = verifyToken(session);
        if (!userId) throw new Error('Invalid token');
        const chats = await storeNewMessageInContact(userId, id, message);
        console.log('contacts');
        chats._id = chats._id.toString();
        chats.sender = chats.sender.toString();
        return { chats, message: 'message stored successfully' };
    }
    catch (err: any) {
        console.log('error', err.message)
        return { message: err.message }
    }
}

// export async function GetMessagesUser1User2WithLimit(session: SessionInterface, id: string, limit: number) {
//     console.log('getting messages between user1 and user2...');
//     try {
//         const { id: userId } = verifyToken(session);
//         if (!userId) throw new Error('Invalid token');
//         const chats = await getMessagesUser1User2WithLimit(id, userId, limit);
//         console.log('contacts');
//         return { chats, message: 'contacts fetched successfully' };
//     }
//     catch (err: any) {
//         console.log('error', err.message)
//         return { message: err.message }
//     }
// }