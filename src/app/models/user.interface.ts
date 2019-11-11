export interface User {
    _id: string;
    name: string;
    email: string;
    gender: string;
    age: number;
    about: string;
    interests: string[];
    images?: string[];

    password?: string;

    [key: string]: any;
}
