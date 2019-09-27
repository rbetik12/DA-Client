import { Injectable } from '@angular/core';
import { User } from '../register-page/register-page.component';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor() {
    }

    authorised(): boolean {
        return false;
    }

    login(email: string, password: string): void {

    }

    register(userInfo: User): void {

    }

}
