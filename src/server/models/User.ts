interface User {
    name: string;
    username: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
    bio?: string;
    gender: 'm' | 'f' | 'o';
}

export default User;