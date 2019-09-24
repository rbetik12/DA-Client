import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { validators } from '../register-page/register-page.component';

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

    onSubmit() {

    }
}
