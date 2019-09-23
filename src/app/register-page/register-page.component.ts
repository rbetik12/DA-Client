import { Component } from '@angular/core';
import { MatListOption } from '@angular/material';
import { FormControl, FormGroup } from '@angular/forms';

export interface User {
    name: string;
    email: string;
    gender: string;
    age: number;
    about: string;
    interests: string[];
    [key: string]: any;
}

@Component({
    selector: 'app-register-page',
    templateUrl: './register-page.component.html',
    styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent {

    registrationForm = new FormGroup({
        email: new FormControl(''),
        password: new FormControl(''),
        name: new FormControl(''),
        age: new FormControl(''),
        gender: new FormControl(''),
        about: new FormControl(''),
    });

    interests: string[];
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
