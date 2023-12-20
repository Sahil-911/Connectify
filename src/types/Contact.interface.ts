import { ObjectId } from "mongoose";
import { User } from "./User.interface";
import { Message } from "./Message.interface";

export interface contactInput {
    from: User;
    to: User;
    messagesfrom: Message[] | ObjectId[];
    messagesto: Message[] | ObjectId[];
}

export type contact = contactInput & { _id: ObjectId };