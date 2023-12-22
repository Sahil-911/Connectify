'use server';

import { SessionInterface } from "@/context/session";
import { verifyToken } from "@/server/services/auth.service";
import { connectByIdRequest, disconnectByIdWithdrawal } from "@/server/services/user.service";

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