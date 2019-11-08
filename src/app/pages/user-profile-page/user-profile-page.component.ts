import { Component, OnInit } from '@angular/core';
import { User } from '../register-page/register-page.component';
import { Platform } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-user-profile-page',
    templateUrl: './user-profile-page.component.html',
    styleUrls: ['./user-profile-page.component.scss'],
})
export class UserProfilePageComponent implements OnInit {

    user: User = {
        name: 'kek',
        email: 'lol@gmail.com',
        gender: 'M',
        interests: ['kek', 'lol'],
        about: 'intersting young kek',
        age: 22,
        photos: ['https://i.pinimg.com/originals/90/41/f0/9041f0a56732ec5ff824ea92852df69e.jpg']
    };
    width: number;

    constructor(private platform: Platform,
                private activatedRoute: ActivatedRoute) {
    }

    ngOnInit() {
        this.width = this.platform.width();
        console.log(this.activatedRoute.snapshot.params.id);
    }

}
