import { UserModel } from '@/server/models/User.model';
import { UserInput, User } from '@/types/User.interface';
import bcrypt from 'bcrypt';

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

export const getUserById = async (id: string) => {
    const userExists = await UserModel.exists({ _id: id });
    if (userExists) {
        const user = await UserModel.findById(id);
        return user;
    } else {
        throw new Error('User not found');
    }
}

export const updateUserById = async (id: string, user: UserInput) => {
    const userExists = await UserModel.exists({ _id: id });
    if (userExists) {
        const updatedUser = await UserModel.findByIdAndUpdate(id, user);
        return updatedUser;
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