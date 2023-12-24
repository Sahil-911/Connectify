import { Message } from "./Message.interface";
import { User } from "./User.interface";

export interface contactInput {
    from: User;
    to: User;
    messagesfrom: Message[];
    messagesto: Message[];
}

export interface contactInputWithId extends contactInput {
    _id: string;
}

export type contact = contactInputWithId;