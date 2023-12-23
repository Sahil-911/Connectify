'use server';

import { SessionInterface } from "@/context/session";
import { verifyToken } from "@/server/services/auth.service";
import { acceptRequest, connectByIdRequest, disconnectByIdWithdrawal, rejectRequest, removeFriend } from "@/server/services/user.service";

export async function WithdrawPendingConnection(session: SessionInterface, id: string) {
    console.log('Withdrawal...', id);
    console.log(session);
    try {
        const { id: userId } = verifyToken(session);
        if (!userId) throw new Error('Invalid token');
        if (userId === id) throw new Error('Cannot do withdrawal from self');
        const message = await disconnectByIdWithdrawal(userId, id);
        console.log('successful withdrawal hehe');
        return { message: message };
    }
    catch (err: any) {
        console.log('error', err.message)
        return { message: err.message }
    }
}

export async function ConnectByIdRequest(session: SessionInterface, id: string) {
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

export async function AcceptRequest(session: SessionInterface, id: string) {
    console.log('accepting...', id);
    try {
        const { id: userId } = verifyToken(session);
        if (!userId) throw new Error('Invalid token');
        if (userId === id) throw new Error('Cannot connect to self');
        const message = await acceptRequest(userId, id);
        console.log('almost...');
        return { message: message };
    }
    catch (err: any) {
        return { message: err.message }
    }
}

export async function RejectRequest(session: SessionInterface, id: string) {
    console.log('rejecting...', id);
    try {
        const { id: userId } = verifyToken(session);
        if (!userId) throw new Error('Invalid token');
        if (userId === id) throw new Error('Cannot connect to self');
        const message = await rejectRequest(userId, id);
        console.log('almost...');
        return { message: message };
    }
    catch (err: any) {
        return { message: err.message }
    }
}

export async function RemoveFriend(session: SessionInterface, id: string) {
    console.log('removing...', id);
    try {
        const { id: userId } = verifyToken(session);
        if (!userId) throw new Error('Invalid token');
        if (userId === id) throw new Error('Cannot connect to self');
        const message = await removeFriend(userId, id);
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