'use server';

import { SessionInterface } from "@/context/session";
import { verifyToken } from "@/server/services/auth.service";
import { getAllUsers, getUserById, updateUserById } from "@/server/services/user.service";

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

export async function UpdateProfile(session: SessionInterface, { user_input }: { user_input: any }) {
    try {
        const { id } = verifyToken(session);
        const updatedProfile = await updateUserById(id, user_input);
        if (updatedProfile)
            return { updatedProfile, message: 'profile updated successfully' };
    }
    catch (err: any) {
        return { updatedProfile: null, message: err.message }
    }
}