import { Message } from "./Message.interface";
import { User } from "./User.interface";

export interface contactInput {
    from: string | User;
    to: string | User;
    messagesfrom: string[] | Message[];
    messagesto: string[] | Message[];
}

export interface contactInputWithId extends contactInput {
    _id: string;
}

export type contact = contactInputWithId;