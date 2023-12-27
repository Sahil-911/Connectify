import { User, UserInputWithId } from "@/types/User.interface";
import { GroupChatModel } from "../models/GroupChat.model";
import { UserModel } from "../models/User.model";
import { createMessage } from "./message.service";
import { MessageInputWithId } from "@/types/Message.interface";

export const getGroupNameById = async (groupId: string) => {
    try {
        const group = await GroupChatModel.findById(groupId);
        if (group) {
            return {
                _id: group._id,
                name: group.name,
            };
        } else {
            throw new Error('Group not found');
        }
    } catch (error) {
        throw new Error('Error fetching group name by ID');
    }
};

export const getGroupNamesByUserId = async (userId: string) => {
    try {
        const user = await UserModel.findById(userId);
        if (user) {
            const groupNames = await Promise.all(
                (user.groupMemberOf || []).map(async (group) => {
                    try {
                        const groupInfo = await getGroupNameById(group.toString());
                        return groupInfo;
                    } catch (error) {
                        // Handle error for a specific group and continue with others
                        console.error(`Error fetching group info for group ID: ${group}`, error);
                        return null;
                    }
                })
            );
            const filteredGroupNames = groupNames.filter(Boolean); // Filtering out null values (error occurred for specific groups)
            const serializedGroupNames = JSON.stringify(filteredGroupNames); // Convert to JSON
            return serializedGroupNames;
        } else {
            throw new Error('User not found');
        }
    } catch (err) {
        throw new Error('Error fetching group names by user ID');
    }
};


export const storeNewMessageInGroup = async (groupId: string, userId: string, message: string) => {
    try {
        const group = await GroupChatModel.findById(groupId);

        if (group) {
            const newMessage = await createMessage(userId, message);

            // Ensure group.messages is initialized as an empty array if it's undefined
            if (!group.messages) {
                group.messages = [];
            }

            // Push the new message's ID to the messages array
            group.messages.push(newMessage._id.toString() as string & MessageInputWithId);

            // Save the changes to the group
            await group.save();

            // Update the newMessage object with _id and sender as strings
            newMessage._id = newMessage._id.toString();
            newMessage.sender = userId;

            return group.toJSON(); // Return the updated group
        } else {
            throw new Error('Group not found for ID: ' + groupId);
        }
    } catch (error: any) {
        console.error('Error storing message in group:', error);
        throw new Error('Failed to store message in group: ' + error.message);
    }
};





export const createGroupService = async (userId: string, groupInput: { name: string, description: string, memberIds: string[] }) => {
    try {
        const newGroup = await GroupChatModel.create({
            name: groupInput.name,
            description: groupInput.description,
            admin: userId.toString(),
            participants: [],
        });

        // Update participants in the new group
        newGroup.participants = [userId.toString(), ...groupInput.memberIds.map((id) => id.toString())];

        // Save the new group to the database
        const savedGroup = await newGroup.save();
        savedGroup._id = savedGroup._id.toString();

        console.log('saved group');
        return savedGroup;
    }
    catch (err) {
        throw new Error('Error creatingg group huihui');
    }
}

export const createNewGroupService: (userId: string, groupInput: { name: string, description: string, memberIds: string[] }) => Promise<any> = async (userId, groupInput) => {
    try {

        const newGroup = await createGroupService(userId, groupInput);
        console.log('new group', newGroup);

        // Update groupMemberOf attribute for all participants
        await UserModel.updateMany(
            {
                $or: [{ _id: userId }, { _id: { $in: groupInput.memberIds } }]
            },
            { $addToSet: { groupMemberOf: newGroup._id.toString() as string } }
        );

        console.log('updated groupMemberOf attribute for all participants');
        return newGroup.toJSON();
    }
    catch (err) {
        throw new Error('Error creating group leee');
    }
};

// export const getGroupDetails = async 