export interface User {
    _id: string;
    name: string;
    email: string;
    gender: string;
    age: number;
    about: string;
    interests: string[];
    likes?: string[];

    password?: string;

    [key: string]: any;
}
