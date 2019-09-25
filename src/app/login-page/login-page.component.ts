import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { validators } from '../register-page/register-page.component';

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
    title = 'AppName';

    loginForm = new FormGroup({
        email: new FormControl('', [
            Validators.required,
            validators.email
        ]),
        password: new FormControl('', [
            Validators.required,
        ])
    });

    userInfo: LoginInfo = {email: null, password: null};

    onSubmit() {
        this.userInfo.email = this.loginForm.value.email;
        this.userInfo.password = this.loginForm.value.password;
        console.table(this.userInfo);
    }
}
