import { UserModel } from '@/server/models/User.model';
import { UserInput, UserInputWithId } from '@/types/User.interface';
import bcrypt from 'bcrypt';
import { Document } from 'mongoose';
import { MessageModel } from '../models/Message.model';

export const createUser = async (user: UserInput) => {
    console.log('we are in createUser');
    const userExists = await UserModel.exists({ username: user?.username }) || await UserModel.exists({ email: user?.email });
    if (userExists) {
        throw new Error('User already exists');
    } else {
        const hashedPassword = await bcrypt.hash(user?.password, 10);
        const newUser = await UserModel.create({
            name: user?.name,
            username: user?.username,
            email: user?.email,
            password: hashedPassword,
            bio: "",
            gender: user?.gender,
            createdAt: Date.now(),
            updatedAt: Date.now()
        });
        return newUser;
    }
};

export const getUserById = async ({ id }: { id: string }) => {
    const userExists = await UserModel.exists({ _id: id });
    if (userExists) {
        const user = await UserModel.findById(id);
        console.log(user?.toJSON(), 'json');
        console.log(user, 'without json');
        return user?.toJSON();
    } else {
        throw new Error('User not found');
    }
}

export const updateUserById = async (id: string, user: UserInput) => {
    const userExists = await UserModel.exists({ _id: id });
    if (userExists) {
        const updatedUser = await UserModel.findByIdAndUpdate(id, user);
        return {
            name: updatedUser?.name,
            username: updatedUser?.username,
            email: updatedUser?.email,
            bio: updatedUser?.bio,
            gender: updatedUser?.gender,
            connections: updatedUser?.connections,
            pendingConnections: updatedUser?.pendingConnections,
            connectionRequests: updatedUser?.connectionRequests,
            groupMemberOf: updatedUser?.groupMemberOf
        }
    } else {
        throw new Error('User not found');
    }
}

export const deleteUserById = async (id: string) => {
    const userExists = await UserModel.exists({ _id: id });
    if (userExists) {
        const deletedUser = await UserModel.findByIdAndDelete(id);
        return deletedUser;
    } else {
        throw new Error('User not found');
    }
}

export const getAllUsers = async () => {
    const users = await UserModel.find({});
    return {
        users: users.map((user) => castDocumentToUser(user)),
        count: users.length
    };
}

export const connectByIdRequest = async (userId: string, id: string) => {

    console.log('service', userId, id);
    const user2Exists = await UserModel.exists({ _id: id });
    if (user2Exists) console.log('le');
    const user1 = await UserModel.findById({ _id: userId });
    if (user1) console.log('yes user1');
    const user2 = await UserModel.findById({ _id: id });
    if (user2) console.log('yes user2');
    if (user2Exists) {
        if (user1 && user1.pendingConnections?.includes(id as any)) {
            console.log('Already');
            throw new Error('Already requested');
        }
        else if (user2 && user2.connectionRequests?.includes(userId as any)) {
            console.log('requested');
            throw new Error('Already requested');
        }
        else {
            if (user1) {
                console.log('user1 ok 6e');
                user1.pendingConnections = user1.pendingConnections || [];
                user1.pendingConnections.push(id as any);
                console.log('user1 ok 6e2');
                await user1.save();
            }
            if (user2) {
                console.log('user2 ok 6e');
                user2.connectionRequests = user2.connectionRequests || [];
                user2.connectionRequests.push(userId as any);
                console.log('user2 ok 6e2');
                await user2.save();
            }
            console.log(user1, user2);
            return { message: 'Connected successfully' };
        }
    }
    else {
        console.log('hu vaat kare');
        throw new Error('User not found');
    }
}

export const disconnectByIdWithdrawal = async (userId: string, id: string) => {
    const user2Exists = await UserModel.exists({ _id: id });
    const user1 = await UserModel.findById({ _id: userId });
    const user2 = await UserModel.findById({ _id: id });
    if (user2Exists) {
        if (user1 && user1.pendingConnections?.includes(id as any)) {
            const objectId1 = userId;
            const objectId2 = id;
            if (user1) {
                if (Array.isArray(user1.pendingConnections)) {
                    user1.pendingConnections = user1.pendingConnections.filter((connection) => connection.toString() !== objectId2.toString()) as string[];
                }
                await user1.save();
            }
            if (user2) {
                if (Array.isArray(user2.connectionRequests)) {
                    user2.connectionRequests = user2.connectionRequests.filter((connection) => connection.toString() !== objectId1.toString()) as string[];
                }
                await user2.save();
            }
            console.log(user1, user2);
            return { message: 'Withdrawal Completed' };
        } else {
            throw new Error('Not connected');
        }
    } else {
        throw new Error('User not found');
    }
}

export const getAllNewUsers = async (userId: string) => {
    try {
        // Find the user by ID
        const user = await UserModel.findById(userId);

        if (!user) {
            throw new Error('User not found');
        }

        const connections = Array.isArray(user.connections) ? user.connections : [];
        const pendingConnections = user.pendingConnections || [];
        const connectionRequests = user.connectionRequests || [];

        // Fetch all users from the database where their IDs are not in connections, pendingConnections, or connectionRequests of the given user
        const newUsers = await UserModel.find({
            _id: {
                $nin: [
                    ...connections,
                    ...pendingConnections,
                    ...connectionRequests,
                    userId
                ]
            }
        });

        // console.log('navaaa', newUsers)

        return newUsers.map((newUser) => newUser.toJSON());
    } catch (error: any) {
        throw new Error('Error fetching new users: ' + error.message);
    }
};

export const getAllConnections = async (userId: string) => {
    try {
        const user = await UserModel.findById(userId).populate('connections');
        console.log('use', user);

        if (!user) {
            throw new Error('User not found');
        }

        const connections = user.connections || [];
        const connectedUsers = await UserModel.find({ _id: { $in: connections } });

        const friends = connectedUsers.map((connectedUser) => connectedUser.toJSON());
        console.log(friends);
        return friends;
    } catch (error: any) {
        throw new Error('Error fetching connections: ' + error.message);
    }
};

export const getAllConnectionsNameId = async (userId: string) => {
    try {
        const user = await UserModel.findById(userId).populate('connections');

        if (!user) {
            throw new Error('User not found');
        }

        const connections = user.connections || [];
        const connectedUsers = await UserModel.find({ _id: { $in: connections } });

        const formattedConnections = connectedUsers.map((connectedUser: any) => ({
            _id: connectedUser._id,
            name: connectedUser.name,
            username: connectedUser.username
        }));

        return { connections: formattedConnections };
    } catch (error: any) {
        throw new Error('Error fetching connections: ' + error.message);
    }
};

export const getAllPendingConnections = async (userId: string) => {
    try {
        const user = await UserModel.findById(userId).populate('pendingConnections');

        if (!user) {
            throw new Error('User not found');
        }

        const pendingConnections = user.pendingConnections || [];
        const pendingUsers = await UserModel.find({ _id: { $in: pendingConnections } });

        return pendingUsers.map((pendingUser) => pendingUser.toJSON());

    } catch (error: any) {
        throw new Error('Error fetching pendingConnections: ' + error.message);
    }
};

export const getAllConnectionRequests = async (userId: string) => {
    try {
        const user = await UserModel.findById(userId).populate('connectionRequests');

        if (!user) {
            throw new Error('User not found');
        }

        const connectionRequests = user.connectionRequests || [];
        const requests = await UserModel.find({ _id: { $in: connectionRequests } });

        return requests.map((request) => request.toJSON());
    } catch (error: any) {
        throw new Error('Error fetching connectionRequests: ' + error.message);
    }
}

export const acceptRequest = async (userId: string, id: string) => {
    console.log('service', userId, id);
    const user2Exists = await UserModel.exists({ _id: id });
    if (user2Exists) console.log('le');
    const user1 = await UserModel.findById({ _id: userId });
    if (user1) console.log('yes user1', user1);
    const user2 = await UserModel.findById({ _id: id });
    if (user2) console.log('yes user2', user2);
    if (user2Exists) {
        if (user1 && user1.connections?.includes(id as any)) {
            console.log('Already');
            throw new Error('Already Connected');
        }
        else if (user2 && user2.connections?.includes(userId as any)) {
            console.log('Connected');
            throw new Error('Already Connected');
        }
        else {
            if (user1) {
                console.log('user1 ok 6e');
                user1.connections = user1.connections || [];
                user1.connections.push(id as any);
                user1.connectionRequests = user1.connectionRequests?.filter(connection => connection.toString() !== id) as string[];
                user1.pendingConnections = user1.pendingConnections?.filter(connection => connection.toString() !== id) as string[];
                await user1.save();
            }
            if (user2) {
                console.log('user2 ok 6e');
                user2.connections = user2.connections || [];
                user2.connections.push(userId as any);
                user2.pendingConnections = user2.pendingConnections?.filter((connection) => connection.toString() !== userId) as string[];
                user2.connectionRequests = user2.connectionRequests?.filter((connection) => connection.toString() !== userId) as string[];
                await user2.save();
            }
            console.log(user1, user2);
            return { message: 'Connected successfully' };
        }
    }
    else {
        console.log('hu vaat kare');
        throw new Error('User not found');
    }
}

export const rejectRequest = async (userId: string, id: string) => {
    const user2Exists = await UserModel.exists({ _id: id });
    const user1 = await UserModel.findById({ _id: userId });
    const user2 = await UserModel.findById({ _id: id });
    if (user2Exists) {
        if (user1 && user1.connectionRequests?.includes(id as any)) {
            if (user1) {
                user1.connectionRequests = (user1.connectionRequests as string[])?.filter((connection) => connection.toString() !== id);
                await user1.save();
            }
            if (user2) {
                user2.pendingConnections = user2.pendingConnections?.filter((connection) => connection.toString() !== userId) as string[];
                await user2.save();
            }
            console.log(user1, user2);
            return { message: 'Request Rejected' };
        } else {
            throw new Error('Not connected');
        }
    } else {
        throw new Error('User not found');
    }
}

export const removeFriend = async (userId: string, id: string) => {
    const user2Exists = await UserModel.exists({ _id: id });
    const user1 = await UserModel.findById({ _id: userId });
    const user2 = await UserModel.findById({ _id: id });
    if (user2Exists) {
        if (user1 && user1.connections?.includes(id as any)) {
            if (user1) {
                user1.connections = user1.connections?.filter((connection) => connection?.toString() !== id) as string[];
                user1.pendingConnections = user1.pendingConnections?.filter((connection) => connection?.toString() !== id) as string[];
                user1.connectionRequests = user1.connectionRequests?.filter((connection) => connection?.toString() !== id) as string[];
                await user1.save();
            }
            if (user2) {
                user2.connections = user2.connections?.filter((connection) => connection?.toString() !== userId) as string[];
                user2.pendingConnections = user2.pendingConnections?.filter((connection) => connection?.toString() !== userId) as string[];
                user2.connectionRequests = user2.connectionRequests?.filter((connection) => connection?.toString() !== userId) as string[];
                await user2.save();
            }
            console.log(user1, user2);
            return { message: 'Friend Removed' };
        } else {
            throw new Error('Not connected');
        }
    } else {
        throw new Error('User not found');
    }
}

export const getNameOfConnections = async (userId: string) => {
    try {
        const user = await UserModel.findById(userId).populate('connections');

        if (!user) {
            throw new Error('User not found');
        }

        const connections = user.connections || [];
        const connectedUsers = await UserModel.find({ _id: { $in: connections } });

        const formattedConnections = connectedUsers.map((connectedUser: any) => ({
            _id: connectedUser._id.toString(),
            name: connectedUser.name.toString(),
            username: connectedUser.username.toString(),
        }));

        return formattedConnections;
    } catch (error: any) {
        throw new Error('Error fetching connections: ' + error.message);
    }
}

// get the list of connections in order of their last message, connection with latest message comes first
export const getConnectionsByLastMessage = async (userId: string) => {
    try {
        const user = await UserModel.findById(userId).populate('connections');

        if (!user) {
            throw new Error('User not found');
        }

        const connections = user.connections || [];
        const connectedUsers = await UserModel.find({ _id: { $in: connections } });

        // Retrieve the last messages for each connected user
        const lastMessages = await Promise.all(connectedUsers.map(async (connectedUser: any) => {
            const lastMessage = await MessageModel.findOne({ sender: connectedUser._id }).sort({ timestamp: -1 }).limit(1);
            return {
                userId: connectedUser._id,
                lastMessage: lastMessage ? lastMessage.timestamp : null,
            };
        }));

        // Sort the connected users based on their last message timestamps in descending order
        connectedUsers.sort((a: any, b: any) => {
            const lastMessageA = lastMessages.find((msg) => msg.userId.equals(a._id));
            const lastMessageB = lastMessages.find((msg) => msg.userId.equals(b._id));

            if (!lastMessageA || !lastMessageB) {
                return 0;
            }

            if (lastMessageA.lastMessage && lastMessageB.lastMessage) {
                return lastMessageB.lastMessage.getTime() - lastMessageA.lastMessage.getTime();
            }

            return 0;
        });

        const formattedConnections = connectedUsers.map((connectedUser: any) => ({
            _id: connectedUser._id,
            name: connectedUser.name,
            username: connectedUser.username,
        }));

        return { connections: formattedConnections };
    } catch (error: any) {
        throw new Error('Error fetching connections: ' + error.message);
    }
};


function castDocumentToUser(
    user: (Document<unknown, {}, UserInputWithId>) | null
) {
    if (user instanceof Document) {
        return user.toJSON();
    } else {
        return null;
    }
}