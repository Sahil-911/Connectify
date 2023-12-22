import { UserModel } from '@/server/models/User.model';
import { UserInput, User } from '@/types/User.interface';
import bcrypt from 'bcrypt';
import { Document, ObjectId } from 'mongoose';
import { Types } from 'mongoose';

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
        return {
            name: user?.name,
            username: user?.username,
            email: user?.email,
            bio: user?.bio,
            gender: user?.gender,
            connection: user?.connections,
            pendingConnection: user?.pendingConnections,
            connectionRequests: user?.connectionRequests
        }
    } else {
        throw new Error('User not found');
    }
}

export const updateUserById = async (id: string, user: UserInput) => {
    const userExists = await UserModel.exists({ _id: id });
    if (userExists) {
        const updatedUser = await UserModel.findByIdAndUpdate(id, user);
        return castDocumentToUser(updatedUser);
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
        if (user1 && user1.connectionRequests?.includes(new Types.ObjectId(id) as any)) {
            console.log('Already');
            throw new Error('Already requested');
        }
        else if (user2 && user2.pendingConnections?.includes(new Types.ObjectId(userId) as any)) {
            console.log('requested');
            throw new Error('Already requested');
        }
        else {
            if (user1) {
                user1.connectionRequests = user1.connectionRequests || [];
                user1.connectionRequests.push(new Types.ObjectId(id) as any);
                await user1.save();
            }
            if (user2) {
                user2.pendingConnections = user2.pendingConnections || [];
                user2.pendingConnections.push(new Types.ObjectId(userId) as any);
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
        if (user1 && user1.connectionRequests?.includes(new Types.ObjectId(id) as any)) {
            const objectId1 = new Types.ObjectId(userId);
            const objectId2 = new Types.ObjectId(id);
            if (user1) {
                user1.connectionRequests = user1.connectionRequests?.filter((connection) => connection.toString() !== objectId2.toString());
                await user1.save();
            }
            if (user2) {
                user2.pendingConnections = user2.pendingConnections?.filter((connection) => connection.toString() !== objectId1.toString());
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

function castDocumentToUser(
    user: (Document<unknown, {}, UserInput> & UserInput & {
        _id: Types.ObjectId;
    }) | null
) {
    if (user instanceof Document) {
        return user.toJSON();
    } else {
        return null; // or handle the case when user is null or doesn't contain a toJSON method
    }
}

