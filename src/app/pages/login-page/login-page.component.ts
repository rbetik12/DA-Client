import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { validators } from '../register-page/register-page.component';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';
import { LoginInfo } from '../../models/logininfo.model';

@Component({
    selector: 'app-login-page',
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {

    constructor(private auth: AuthService, private router: Router) {
    }

    title = 'ReadR';
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
                this.router.navigateByUrl('').then(r => {
                });
            },
            error => {
                console.error(`${error.status} ${error.statusText}`);
                this.error = true;
            });
    }
}
