import { Component } from '@angular/core';
import { MatListOption } from '@angular/material';

export interface User {
    name: string;
    email: string;
    gender: string;
    age: number;
    about: string;
    interests: string[];
}

@Component({
    selector: 'app-register-page',
    templateUrl: './register-page.component.html',
    styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent {

    name: string;
    email: string;
    gender: string;
    age: number;
    about: string;
    interests: string[];
    password: string;

    newUser: User;

    onSelect(selectedOptions: MatListOption[]) {
        this.interests = [];
        for (const category of selectedOptions) {
            this.interests.push(category.value);
        }
    }

    onSubmit($event: Event) {
        event.preventDefault();
        this.newUser = {
            name: this.name,
            email: this.email,
            gender: this.gender,
            age: this.age,
            about: this.about,
            interests: this.interests
        };

        console.table(this.newUser);
        console.log(this.password);
    }

}
