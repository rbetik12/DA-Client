import { Injectable } from '@angular/core';
import { User } from '../register-page/register-page.component';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginInfo } from '../login-page/login-page.component';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private http: HttpClient) {
    }

    authorised(): boolean {
        if (!this.validateToken()) {
            return false;
        } else {
            return true;
        }
    }

    login(loginInfo: LoginInfo): Observable<void> {
        return this.http.post<LoginInfo>('/api/login', { loginInfo }).pipe(map(res => {
            console.log(res);
            this.setSession(res);
        }));
    }

    register(userInfo: User): Observable<HttpResponse<User>> {
        return this.http.post<User>('/api/register', { userInfo }, { observe: 'response' });
    }

    private setSession(res): void {
        localStorage.setItem('session_token', res.emailToken);
        localStorage.setItem('expires_at', res.expiresIn);
    }

    logout(): void {
        localStorage.setItem('session_token', null);
        localStorage.setItem('expires_at', null);
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
