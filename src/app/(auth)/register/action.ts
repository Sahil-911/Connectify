"use server";

import { createUser } from "@/server/services/user.service";
import { UserInput } from "@/types/User.interface";

export async function postUser({ user_input }: { user_input: UserInput }) {
    console.log('we are in postUser');
    try {
        const user = await createUser(user_input);
        return { user, message: "User created successfully" };
    }
    catch (error: any) {
        return { user: null, message: error.message };
    }
}