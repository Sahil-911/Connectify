import { MessageModel } from "../models/Message.model";
import { UserModel } from "../models/User.model";
import { MessageInput, TextMessage, ImageMessage, Message, MessageType } from "../../types/Message.interface";
import { User } from "../../types/User.interface";
import { verifyToken } from "./auth.service";

export const createMessage = async (token: string, message: MessageInput) => {
    const { id } = verifyToken({ token });
    const userExists = await UserModel.exists({ _id: id });
    if (userExists) {
        const newMessage = await MessageModel.create({
            messageId: message?.messageId,
            sender: id,
            receiver: message?.receiver,
            content: message?.content,
            timestamp: Date.now(),
        });
        return newMessage;
    } else {
        throw new Error('User not found');
    }
};

export const getMessageById = async (token: string, messageId: string) => {
    const { id } = verifyToken({ token });
    const userExists = await UserModel.exists({ _id: id });
    if (userExists) {
        const messageExists = await MessageModel.exists({ messageId });
        if (messageExists) {
            const message = await MessageModel.findById(messageId);
            return message;
        } else {
            throw new Error('Message not found');
        }
    } else {
        throw new Error('User not found');
    }
}

export const getMessagesByUserId = async (token: string, userId: string) => {
    const { id } = verifyToken({ token });
    const userExists = await UserModel.exists({ _id: id });
    if (userExists) {
        const messages = await MessageModel.find({ sender: userId });
        return messages;
    } else {
        throw new Error('User not found');
    }
}

export const updateMessageById = async (token: string, messageId: string, message: MessageInput) => {
    const { id } = verifyToken({ token });
    const userExists = await UserModel.exists({ _id: id });
    if (userExists) {
        const messageExists = await MessageModel.exists({ messageId });
        if (messageExists) {
            const updatedMessage = await MessageModel.findByIdAndUpdate(messageId, message);
            return updatedMessage;
        } else {
            throw new Error('Message not found');
        }
    } else {
        throw new Error('User not found');
    }
}

export const deleteMessageById = async (token: string, messageId: string) => {
    const { id } = verifyToken({ token });
    const userExists = await UserModel.exists({ _id: id });
    if (userExists) {
        const messageExists = await MessageModel.exists({ messageId });
        if (messageExists) {
            const deletedMessage = await MessageModel.findByIdAndDelete(messageId);
            return deletedMessage;
        } else {
            throw new Error('Message not found');
        }
    } else {
        throw new Error('User not found');
    }
}

export const createTextMessage = async (token: string, message: TextMessage) => {
    const { id } = verifyToken({ token });
    const userExists = await UserModel.exists({ _id: id });
    if (userExists) {
        const newMessage = await MessageModel.create({
            messageId: message?.messageId,
            sender: id,
            receiver: message?.receiver,
            content: message?.content,
            timestamp: Date.now(),
        });
        return newMessage;
    } else {
        throw new Error('User not found');
    }
};

export const createImageMessage = async (token: string, message: ImageMessage) => {
    const { id } = verifyToken({ token });
    const userExists = await UserModel.exists({ _id: id });
    if (userExists) {
        const newMessage = await MessageModel.create({
            messageId: message?.messageId,
            sender: id,
            receiver: message?.receiver,
            content: message?.content,
            timestamp: Date.now(),
        });
        return newMessage;
    } else {
        throw new Error('User not found');
    }
};

export const getMessagesByUserIds = async (token: string, userId1: string, userId2: string) => {
    const { id } = verifyToken({ token });
    const userExists = await UserModel.exists({ _id: id });
    if (userExists) {
        const messages = await MessageModel.find({ sender: userId1, receiver: userId2 });
        return messages;
    } else {
        throw new Error('User not found');
    }
}

export const getMessagesByUsernames = async (token: string, username1: string, username2: string) => {
    const { id } = verifyToken({ token });
    const userExists = await UserModel.exists({ _id: id });
    if (userExists) {
        let user1 = await UserModel.findOne({ username: username1 });
        let user2 = await UserModel.findOne({ username: username2 });
        if (user1 && user2) {
            const messages = await MessageModel.find({ sender: user1._id, receiver: user2._id });
            return messages;
        } else {
            throw new Error('User not found');
        }
    } else {
        throw new Error('User not found');
    }
}

export const getMessagesByUserEmails = async (token: string, email1: string, email2: string) => {
    const { id } = verifyToken({ token });
    const userExists = await UserModel.exists({ _id: id });
    if (userExists) {
        let user1 = await UserModel.findOne({ email: email1 });
        let user2 = await UserModel.findOne({ email: email2 });
        if (user1 && user2) {
            const messages = await MessageModel.find({ sender: user1._id, receiver: user2._id });
            return messages;
        } else {
            throw new Error('User not found');
        }
    } else {
        throw new Error('User not found');
    }
}

export const getMessagesByUserIdsAndTimestamp = async (token: string, userId1: string, userId2: string, timestamp: number) => {
    const { id } = verifyToken({ token });
    const userExists = await UserModel.exists({ _id: id });
    if (userExists) {
        const messages = await MessageModel.find({ sender: userId1, receiver: userId2, timestamp: { $gt: timestamp } });
        return messages;
    } else {
        throw new Error('User not found');
    }
}

export const getMessagesByUsernamesAndTimestamp = async (token: string, username1: string, username2: string, timestamp: number) => {
    const { id } = verifyToken({ token });
    const userExists = await UserModel.exists({ _id: id });
    if (userExists) {

        let user1 = await UserModel.findOne({ username: username1 });
        let user2 = await UserModel.findOne({ username: username2 });
        if (user1 && user2) {
            const messages = await MessageModel.find({ sender: user1._id, receiver: user2._id, timestamp: { $gt: timestamp } });
            return messages;
        } else {
            throw new Error('User not found');
        }
    } else {
        throw new Error('User not found');
    }
}

export const getMessagesByUserEmailsAndTimestamp = async (token: string, email1: string, email2: string, timestamp: number) => {
    const { id } = verifyToken({ token });
    const userExists = await UserModel.exists({ _id: id });
    if (userExists) {

        let user1 = await UserModel.findOne({ email: email1 });
        let user2 = await UserModel.findOne({ email: email2 });
        if (user1 && user2) {
            const messages = await MessageModel.find({ sender: user1._id, receiver: user2._id, timestamp: { $gt: timestamp } });
            return messages;
        } else {
            throw new Error('User not found');
        }
    } else {
        throw new Error('User not found');
    }
}

export const getMessagesByUserIdAndTimestamp = async (token: string, userId: string, timestamp: number) => {
    const { id } = verifyToken({ token });
    const userExists = await UserModel.exists({ _id: id });
    if (userExists) {

        const messages = await MessageModel.find({ sender: userId, timestamp: { $gt: timestamp } });
        return messages;
    } else {
        throw new Error('User not found');
    }
}

export const getMessagesByUserUsernameAndTimestamp = async (token: string, username: string, timestamp: number) => {
    const { id } = verifyToken({ token });
    const userExists = await UserModel.exists({ _id: id });
    if (userExists) {

        let user = await UserModel.findOne({ username: username });
        if (user) {
            const messages = await MessageModel.find({ sender: user._id, timestamp: { $gt: timestamp } });
            return messages;
        } else {
            throw new Error('User not found');
        }
    } else {
        throw new Error('User not found');
    }
}

export const getMessagesByUserEmailAndTimestamp = async (token: string, email: string, timestamp: number) => {
    const { id } = verifyToken({ token });
    const userExists = await UserModel.exists({ _id: id });
    if (userExists) {

        let user = await UserModel.findOne({ email: email });
        if (user) {
            const messages = await MessageModel.find({ sender: user._id, timestamp: { $gt: timestamp } });
            return messages;
        } else {
            throw new Error('User not found');
        }
    } else {
        throw new Error('User not found');
    }
}

export const getMessagesByTimestamp = async (token: string, timestamp: number) => {
    const { id } = verifyToken({ token });
    const userExists = await UserModel.exists({ _id: id });
    if (userExists) {

        const messages = await MessageModel.find({ timestamp: { $gt: timestamp } });
        return messages;
    } else {
        throw new Error('User not found');
    }
}

export const getMessagesByUserIdsAndTimestampRange = async (token: string, userId1: string, userId2: string, timestamp1: number, timestamp2: number) => {
    const { id } = verifyToken({ token });
    const userExists = await UserModel.exists({ _id: id });
    if (timestamp1 > timestamp2) {
        throw new Error('Invalid timestamp range');
    }
    if (userExists) {
        const messages = await MessageModel.find({ sender: userId1, receiver: userId2, timestamp: { $gt: timestamp1, $lt: timestamp2 } });
        return messages;
    } else {
        throw new Error('User not found');
    }
}

export const getMessagesByUsernamesAndTimestampRange = async (token: string, username1: string, username2: string, timestamp1: number, timestamp2: number) => {
    const { id } = verifyToken({ token });
    const userExists = await UserModel.exists({ _id: id });
    if (timestamp1 > timestamp2) {
        throw new Error('Invalid timestamp range');
    }
    if (userExists) {

        let user1 = await UserModel.findOne({ username: username1 });
        let user2 = await UserModel.findOne({ username: username2 });
        if (user1 && user2) {
            const messages = await MessageModel.find({ sender: user1._id, receiver: user2._id, timestamp: { $gt: timestamp1, $lt: timestamp2 } });
            return messages;
        } else {
            throw new Error('User not found');
        }
    } else {
        throw new Error('User not found');
    }
}

export const getMessagesByUserEmailsAndTimestampRange = async (token: string, email1: string, email2: string, timestamp1: number, timestamp2: number) => {
    const { id } = verifyToken({ token });
    const userExists = await UserModel.exists({ _id: id });
    if (timestamp1 > timestamp2) {
        throw new Error('Invalid timestamp range');
    }
    if (userExists) {

        let user1 = await UserModel.findOne({ email: email1 });
        let user2 = await UserModel.findOne({ email: email2 });
        if (user1 && user2) {
            const messages = await MessageModel.find({ sender: user1._id, receiver: user2._id, timestamp: { $gt: timestamp1, $lt: timestamp2 } });
            return messages;
        } else {
            throw new Error('User not found');
        }
    } else {
        throw new Error('User not found');
    }
}

export const getMessagesByUserIdAndTimestampRange = async (token: string, userId: string, timestamp1: number, timestamp2: number) => {
    const { id } = verifyToken({ token });
    const userExists = await UserModel.exists({ _id: id });
    if (timestamp1 > timestamp2) {
        throw new Error('Invalid timestamp range');
    }
    if (userExists) {

        const messages = await MessageModel.find({ sender: userId, timestamp: { $gt: timestamp1, $lt: timestamp2 } });
        return messages;
    } else {
        throw new Error('User not found');
    }
}

export const getMessagesByUserUsernameAndTimestampRange = async (token: string, username: string, timestamp1: number, timestamp2: number) => {
    const { id } = verifyToken({ token });
    const userExists = await UserModel.exists({ _id: id });
    if (timestamp1 > timestamp2) {
        throw new Error('Invalid timestamp range');
    }
    if (userExists) {

        let user = await UserModel.findOne({ username: username });
        if (user) {
            const messages = await MessageModel.find({ sender: user._id, timestamp: { $gt: timestamp1, $lt: timestamp2 } });
            return messages;
        } else {
            throw new Error('User not found');
        }
    } else {
        throw new Error('User not found');
    }
}

export const getMessagesByUserEmailAndTimestampRange = async (token: string, email: string, timestamp1: number, timestamp2: number) => {
    const { id } = verifyToken({ token });
    const userExists = await UserModel.exists({ _id: id });
    if (timestamp1 > timestamp2) {
        throw new Error('Invalid timestamp range');
    }
    if (userExists) {

        let user = await UserModel.findOne({ email: email });
        if (user) {
            const messages = await MessageModel.find({ sender: user._id, timestamp: { $gt: timestamp1, $lt: timestamp2 } });
            return messages;
        } else {
            throw new Error('User not found');
        }
    } else {
        throw new Error('User not found');
    }
}