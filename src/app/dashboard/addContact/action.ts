'use server';

import { SessionInterface } from "@/context/session";
import { verifyToken } from "@/server/services/auth.service";
import { getAllUsers, getUserById } from "@/server/services/user.service";

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

export async function GetAllProfiles(session: SessionInterface) {
    try {
        const { id } = verifyToken(session);
        if (!id) throw new Error('Invalid token');
        const profiles = await getAllUsers();
        if (profiles)
            return { profiles, message: 'profiles fetched successfully' };
    }
    catch (err: any) {
        return { profiles: null, message: err.message }
    }
}