import { Injectable } from '@angular/core';
import { User } from '../register-page/register-page.component';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginInfo } from '../login-page/login-page.component';
import { map } from 'rxjs/operators';
import { Endpoints } from '../endpoints';

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
}
