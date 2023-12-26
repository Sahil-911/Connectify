import { groupChat } from "./GroupChat.interface";

export interface UserInput {
    name: string;
    username: string;
    email: string;
    password: string;
    bio?: string;
    gender: string;
    connections?: User[];
    pendingConnections?: User[];
    connectionRequests?: User[];
    groupMemberOf?: groupChat[];
}

export interface UserInputWithId extends UserInput {
    _id: string;
}

export type User = UserInputWithId;