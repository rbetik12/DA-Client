import { Injectable } from '@angular/core';
import { User } from '../register-page/register-page.component';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginInfo } from '../login-page/login-page.component';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private http: HttpClient) {
    }

    logged = false;

    authorised(): boolean {
        return this.logged;
    }

    login(loginInfo: LoginInfo): Observable<HttpResponse<LoginInfo>> {
        return this.http.post<LoginInfo>('/api/login', { loginInfo }, { observe: 'response' });
    }

    register(userInfo: User): Observable<HttpResponse<User>> {
        return this.http.post<User>('/api/register', { userInfo }, { observe: 'response' });
    }

    setSession(): void {
        this.logged = true;
    }

    logout(): void {
        this.logged = false;
    }
}
