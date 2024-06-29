'use server';

import { SessionInterface } from "@/context/session";
import { verifyToken } from "@/server/services/auth.service";
import { getAllNewUsers, getAllUsers, getUserById } from "@/server/services/user.service";

export async function FetchProfile(session: SessionInterface) {
    console.log(session);
    try {
        const { id } = verifyToken(session);
        const profile = await getUserById({ id });
        // console.log(profile);
        if (profile)
            return { profile, message: 'profile fetched successfully' };
    }
    catch (err: any) {
        return { profile: null, message: err.message }
    }
}

// get profiles that is not connected or pending or requested
export async function GetAllProfiles(session: SessionInterface) {
    try {
        const { id } = verifyToken(session);
        if (!id) throw new Error('Invalid token');
        const profiles = await getAllNewUsers(id);

        
        profiles.map((profile) => {
            profile._id = profile._id.toString();
            profile.connections = profile?.connections?.toString().split(',') || [];
            profile.connectionRequests = profile.connectionRequests?.toString().split(',') || [];
            profile.pendingConnections = profile.pendingConnections?.toString().split(',') || [];
            profile.groupMemberOf = profile.groupMemberOf?.toString().split(',') || [];
        })
        
        console.log('client side checking', profiles);
        // console.log(profiles);

        if (profiles)
            return { profiles, message: 'profiles fetched successfully' };
    }
    catch (err: any) {
        return { profiles: null, message: err.message }
    }
}