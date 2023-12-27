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
        const connections = await getAllConnections(id);

        connections.map((connection) => {
            connection._id = connection._id.toString();
            connection.connections = connection?.connections?.toString().split(',') || [];
            connection.connectionRequests = connection.connectionRequests?.toString().split(',') || [];
            connection.pendingConnections = connection.pendingConnections?.toString().split(',') || [];
            connection.groupMemberOf = connection.groupMemberOf?.toString().split(',') || [];
        })

        console.log(connections);

        if (connections) {
            return { connections, message: 'Friends fetched successfully' };
        } else {
            return { connections: null, message: 'No friends found' };
        }
    } catch (err: any) {
        return { connections: null, message: err.message };
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

        pendings.map((pending) => {
            pending._id = pending._id.toString();
            pending.connections = pending?.connections?.toString().split(',') || [];
            pending.connectionRequests = pending.connectionRequests?.toString().split(',') || [];
            pending.pendingConnections = pending.pendingConnections?.toString().split(',') || [];
            pending.groupMemberOf = pending.groupMemberOf?.toString().split(',') || [];
        })

        console.log(pendings);

        if (pendings) {
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

        requests.map((request) => {
            request._id = request._id.toString();
            request.connections = request?.connections?.toString().split(',') || [];
            request.connectionRequests = request.connectionRequests?.toString().split(',') || [];
            request.pendingConnections = request.pendingConnections?.toString().split(',') || [];
            request.groupMemberOf = request.groupMemberOf?.toString().split(',') || [];
        })

        console.log(requests);

        if (requests) {
            return { requests, message: 'Requests fetched successfully' };
        } else {
            return { requests: null, message: 'No requests found' };
        }
    } catch (err: any) {
        return { requests: null, message: err.message };
    }
}