import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Endpoints } from '../endpoints';
import { LoginInfo } from '../models/logininfo.model';
import { User } from '../models/user.interface';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private http: HttpClient) {
    }

    authorised(): boolean {
        return this.validateToken();
    }

    login(loginInfo: LoginInfo): Observable<void> {
        return this.http.post<LoginInfo>(Endpoints.login, {loginInfo}).pipe(map(res => {
            console.log(res);
            this.setSession(res);
            this.setCredentials(res);
        }));
    }

    register(userInfo: User): Observable<HttpResponse<User>> {
        return this.http.post<User>(Endpoints.register, {userInfo}, {observe: 'response'});
    }

    logout(): void {
        localStorage.setItem('session_token', null);
        localStorage.setItem('expires_at', null);
    }

    getToken() {
        return localStorage.getItem('session_token');
    }

    private setSession(res): void {
        localStorage.setItem('session_token', res.emailToken);
        localStorage.setItem('expires_at', res.expiresIn);
    }

    private validateToken(): boolean {
        if (!localStorage.getItem('session_token')) {
            return false;
        } else {
            const expiresAt = localStorage.getItem('expires_at');
            return new Date().getTime() < Number.parseInt(expiresAt, 10);
        }
    }

    getCredentials(): User {
        return JSON.parse(localStorage.getItem('creds'));
    }

    updateCredentials(user: User) {
        localStorage.setItem('creds', JSON.stringify(user));
    }

    private setCredentials(res) {
        localStorage.setItem('creds', JSON.stringify(res.credentials));
    }
}
