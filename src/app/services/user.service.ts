import { Injectable } from '@angular/core';
import { User } from '../models/user.interface';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    private currentUser: User;

    constructor() {
    }

    getCredentials(): User {
        return JSON.parse(localStorage.getItem('creds'));
    }

    updateCredentials(user: User) {
        this.currentUser = user;
        localStorage.setItem('creds', JSON.stringify(user));
    }

    setCredentials(res: any) {
        this.currentUser = res.credentials;
        localStorage.setItem('creds', JSON.stringify(res.credentials));
    }
}
