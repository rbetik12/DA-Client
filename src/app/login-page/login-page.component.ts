import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { validators } from '../register-page/register-page.component';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';

export interface LoginInfo {
    email: string;
    password: string;
}

@Component({
    selector: 'app-login-page',
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {

    constructor(private auth: AuthService, private router: Router) {
    }

    title = 'AppName';
    error = false;

    loginForm = new FormGroup({
        email: new FormControl('', [
            Validators.required,
            validators.email
        ]),
        password: new FormControl('', [
            Validators.required,
        ])
    });

    onSubmit() {
        const loginInfo: LoginInfo = { email: this.loginForm.value.email, password: this.loginForm.value.password };
        this.auth.login(loginInfo).pipe(first()).subscribe(res => {
                this.error = false;
                this.router.navigateByUrl('/app').then(r => {
                });
            },
            error => {
                console.error(`${error.status} ${error.statusText}`);
                this.error = true;
            });
    }
}
