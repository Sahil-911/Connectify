'use server';

import { createTokenWithUsername, verifyToken } from "@/server/services/auth.service";

export async function loginAction({ username, password }: { username: string, password: string }) {
    try {
        const token = await createTokenWithUsername({ username, password });
        return {
            session: { token: token },
            message: "Logged in successfully"
        };
    }
    catch (error: any) {
        return { message: error.message, session: null };
    }
}

export async function verifyAction({ token }: { token: string }) {
    try {
        const data = await verifyToken({ token });
        return { message: 'success', id: data.id };
    }
    catch (error: any) {
        return { id: null, message: error.message };
    }
}