'use server';

import { SessionInterface } from "@/context/session";
import { verifyToken } from "@/server/services/auth.service";
import { getAllConnectionRequests, getAllConnections, getAllPendingConnections, getAllUsers, getUserById } from "@/server/services/user.service";

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

export async function GetAllFriends(session: SessionInterface) {
    try {
        const { id } = verifyToken(session);
        const friends = await getAllConnections(id);

        console.log(friends);

        if (friends.connections) {
            return { friends, message: 'Friends fetched successfully' };
        } else {
            return { friends: null, message: 'No friends found' };
        }
    } catch (err: any) {
        return { friends: null, message: err.message };
    }
}

// export async function RemoveConnection(session: SessionInterface, id: string) {
//     try {
//         const { id } = verifyToken(session);
//         const friends = await getAllConnections(id);

//         console.log(friends);

//         if (friends.connections) {
//             return { friends, message: 'Friends fetched successfully' };
//         } else {
//             return { friends: null, message: 'No friends found' };
//         }
//     } catch (err: any) {
//         return { friends: null, message: err.message };
//     }
// }

export async function GetAllPendings(session: SessionInterface) {
    try {
        const { id } = verifyToken(session);
        const pendings = await getAllPendingConnections(id);

        console.log(pendings);

        if (pendings.pendingConnections) {
            return { pendings, message: 'Pendings fetched successfully' };
        } else {
            return { pendings: null, message: 'No pendings found' };
        }
    } catch (err: any) {
        return { pendings: null, message: err.message };
    }
}

export async function GetAllRequests(session: SessionInterface) {
    try {
        const { id } = verifyToken(session);
        const requests = await getAllConnectionRequests(id);

        console.log(requests);

        if (requests.connectionRequests) {
            return { requests, message: 'Requests fetched successfully' };
        } else {
            return { requests: null, message: 'No requests found' };
        }
    } catch (err: any) {
        return { requests: null, message: err.message };
    }
}