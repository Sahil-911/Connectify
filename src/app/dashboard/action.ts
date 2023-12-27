'use server';

import { SessionInterface } from "@/context/session";
import { verifyToken } from "@/server/services/auth.service";
import { getUserById } from "@/server/services/user.service";

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