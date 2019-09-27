import { Injectable } from '@angular/core';
import { User } from '../register-page/register-page.component';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private http: HttpClient) {
    }

    authorised(): boolean {
        return false;
    }

    login(email: string, password: string): void {

    }

    register(userInfo: User): Observable<HttpResponse<User>> {
        return this.http.post<User>('/api/register', { userInfo }, { observe: 'response' });
    }

}
