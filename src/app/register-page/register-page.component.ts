import { Component } from '@angular/core';
import { MatListOption } from '@angular/material';
import { FormControl, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';

export interface User {
    name: string;
    email: string;
    gender: string;
    age: number;
    about: string;
    interests: string[];

    [key: string]: any;
}


const validators = {
    email: Validators.pattern('^(([^<>()\\[\\]\\\\.,;:\\s@"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]'
        + '{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$'),
};

@Component({
    selector: 'app-register-page',
    templateUrl: './register-page.component.html',
    styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent {

    title = 'Registration';

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
    newUser: User;

    onSelect(selectedOptions: MatListOption[]) {
        this.interests = [];
        for (const category of selectedOptions) {
            this.interests.push(category.value);
        }
    }

    onSubmit() {
        const info = this.registrationForm.value as User;
        this.newUser = {
            name: info.name,
            email: info.email,
            password: info.password,
            gender: info.gender,
            age: info.age,
            about: info.about,
            interests: this.interests
        };

        console.table(this.newUser);
    }

}
