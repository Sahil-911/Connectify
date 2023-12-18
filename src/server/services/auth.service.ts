import { sign, verify } from 'jsonwebtoken';
import { UserModel } from '@/server/models/User.model';
import bcrypt from 'bcrypt';

const secret = process.env.JWT_SECRET;

export const createTokenWithUsername = async ({ username, password }: { username: string, password: string }) => {
    if (secret === undefined) throw new Error('JWT_SECRET is not defined');

    const user = await UserModel.findOne({ username });
    if (!user) throw new Error('User not found');

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch)
        throw new Error('Password does not match');
    else {
        const id = user._id;
        const access_token = sign({ id }, secret, { expiresIn: '1h' });
        return access_token;
    }
};

export const createTokenWithEmail = async ({ email, password }: { email: string, password: string }) => {
    if (secret === undefined) throw new Error('JWT_SECRET is not defined');

    const user = await UserModel.findOne({ email });
    if (!user) throw new Error('Email not found');

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch)
        throw new Error('Password does not match');
    else {
        const id = user._id;
        const access_token = sign({ id }, secret, { expiresIn: '1h' });
        return access_token;
    }
};

export const verifyToken = ({ token }: { token: string }) => {
    if (secret === undefined) throw new Error('JWT_SECRET is not defined');
    const payload = verify(token, secret, (err, decoded) => {
        if (err) throw new Error('Invalid token');
        return decoded;
    });
    return (payload as any) as { id: string };
};