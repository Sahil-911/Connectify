import { Message } from "./Message.interface";
import { User } from "./User.interface";

export interface contactInput {
    from: User;
    to: User;
    messagesfrom: string[] | Message[];
    messagesto: string[] | Message[];
}

export interface contactInputWithId extends contactInput {
    _id: string;
}

export type contact = contactInputWithId;