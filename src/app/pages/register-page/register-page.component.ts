import {Component, OnInit} from '@angular/core';
import {MatListOption} from '@angular/material';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {User} from '../../models/user.interface';

export const validators = {
    email: Validators.pattern('^(([^<>()\\[\\]\\\\.,;:\\s@"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]'
        + '{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$'),
};

@Component({
    selector: 'app-register-page',
    templateUrl: './register-page.component.html',
    styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit {

    constructor(private router: Router, private auth: AuthService) {
    }

    title = 'Registration';
    userExistsError = false;
    serverError = false;

    registrationForm = new FormGroup({
        email: new FormControl('', [
            Validators.required,
            validators.email,
        ]),
        password: new FormControl('', [
            Validators.required,
            Validators.minLength(6),
        ]),
        name: new FormControl('', [
            Validators.required,
        ]),
        age: new FormControl('', [
            Validators.required,
        ]),
        gender: new FormControl('', [
            Validators.required
        ]),
        about: new FormControl(''),
    });

    interests: string[] = [];

    ngOnInit(): void {
        this.clearForm();
    }

    onSelect(selectedOptions: MatListOption[]) {
        this.interests = [];
        for (const category of selectedOptions) {
            this.interests.push(category.value);
        }
    }

    onSubmit() {
        const info = this.registrationForm.value as User;
        const user: User = {
            _id: null,
            name: info.name,
            email: info.email.toLowerCase(),
            password: info.password,
            gender: info.gender,
            age: info.age,
            about: info.about,
            interests: this.interests
        };
        console.table(user);
        this.auth.register(user).subscribe(res => {
            this.router.navigateByUrl('/login').then(r => {
            });
        }, error => {
            console.error(error);
            if (error.status === 409) {
                this.userExistsError = true;
            } else if (error.status === 0) {
                this.serverError = true;
            }
        });
    }

    goBack() {
        this.router.navigateByUrl('/login').then(r => {
            this.clearForm();
        });
    }

    clearForm() {
        this.registrationForm.reset({
            email: null,
            password: null,
            name: null,
            age: null,
            gender: null,
            about: null
        });
        this.interests = [];
        this.serverError = false;
        this.userExistsError = false;
    }

}
