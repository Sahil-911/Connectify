'use server';

import { SessionInterface } from "@/context/session";
import { verifyToken } from "@/server/services/auth.service";
import { createNewGroupService, getGroupNamesByUserId, storeNewMessageInGroup } from "@/server/services/group.service";
import { getMessagesGC } from "@/server/services/message.service";
import { getAllConnectionsNameId, getUserById } from "@/server/services/user.service";

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
                _id: profile?._id,
                username: profile?.username,
                name: profile?.name,
                email: profile?.email,
                bio: profile?.bio,
                gender: profile.gender,
                connections: profile?.connections,
                pendingConnections: profile?.pendingConnections,
                connectionRequests: profile?.connectionRequests,
            }, message: 'profile fetched successfully'
        };
    }
    catch (err: any) {
        console.log('error', err.message);
        return { profile: null, message: err.message }
    }
}

export async function GetNameOfGroups(session: SessionInterface) {
    try {
        const { id } = verifyToken(session);
        const groupNames = await getGroupNamesByUserId(id);
        console.log(groupNames);
        if (groupNames)
            return { groupNames, message: 'groupNames fetched successfully' };
        else {
            return { groupNames: null, message: 'No groups found' };
        }
    }
    catch (err: any) {
        console.log('error', err.message);
        return { groups: null, message: err.message }
    }
}

export async function GetMessagesGC(session: SessionInterface, groupId: string) {
    try {
        const { id } = verifyToken(session);
        if (id) {
            const messages = await getMessagesGC(groupId);
            console.log(messages, 'action');
            if (messages)
                return { messages, message: 'message fetched successfully' };
            else
                return { messages: null, message: 'messages not found' };
        } else {
            return { messages: null, message: 'sorry!' }
        }
    }
    catch (err: any) {
        console.log('error', err.message);
        return { messages: null, message: err.message }

    }
}

export async function StoreNewMessageInGroup(session: SessionInterface, groupId: string, message: string) {
    try {
        const { id } = verifyToken(session);
        if (!id) throw new Error('Invalid token');

        // Check the implementation of storeNewMessageInGroup function
        const chats = await storeNewMessageInGroup(groupId, id, message);
        console.log(chats);
        
        if (chats) {
            return { chats, message: 'message stored successfully' };
        } else {
            return { chats: null, message: 'message not stored' };
        }
    } catch (err: any) {
        console.error('Error in StoreNewMessageInGroup:', err.message);
        return { chats: null, message: err.message };
    }
}


export async function GetAllFriends(session: SessionInterface) {
    try {
        const { id } = verifyToken(session);
        const friends = await getAllConnectionsNameId(id);

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

export async function CreateNewGroup(session: SessionInterface, { groupInput }: { groupInput: { name: string, description: string, memberIds: string[] } }) {
    try {
        const { id } = verifyToken(session);
        const group = await createNewGroupService(id, groupInput);
        console.log('hmmmmmm', group);
        if (group) {
            console.log('nigghhhhaa', group);
            return { group, message: 'group created successfully' };
        }
        else {
            return { group: null, message: 'group not created' };
        }
    }
    catch (err: any) {
        console.log('error huhuhuhu', err.message);
        return { group: null, message: err.message }
    }
}