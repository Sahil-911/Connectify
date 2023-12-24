'use server';

import { SessionInterface } from "@/context/session";
import { verifyToken } from "@/server/services/auth.service";
import { storeNewMessageInContact } from "@/server/services/contact.service";
import { getMessagesUser1User2 } from "@/server/services/message.service";
import { connectByIdRequest, disconnectByIdWithdrawal, getNameOfConnections, getUserById } from "@/server/services/user.service";

export async function FetchProfile(session: SessionInterface) {
    console.log(session);
    try {
        const { id } = verifyToken(session);
        const profile = await getUserById({ id });
        console.log(profile);
        if (profile)
            return { profile, message: 'profile fetched successfully' };
    }
    catch (err: any) {
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

export async function GetNameOfConnections(session: SessionInterface) {
    console.log('getting names of connections...');
    try {
        const { id: userId } = verifyToken(session);
        if (!userId) throw new Error('Invalid token');
        const contacts = await getNameOfConnections(userId);
        console.log('contacts');
        return { contacts, message: 'contacts fetched successfully' };
    }
    catch (err: any) {
        console.log('error', err.message)
        return { message: err.message }
    }
}

export async function GetMessagesUser1User2(session: SessionInterface, id: string) {
    console.log('getting messages between user1 and user2...');
    try {
        const { id: userId } = verifyToken(session);
        if (!userId) throw new Error('Invalid token');
        const chats = await getMessagesUser1User2(id, userId);
        console.log('contacts');
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