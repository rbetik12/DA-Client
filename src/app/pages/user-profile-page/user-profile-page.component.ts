import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../models/user.interface';

@Component({
    selector: 'app-user-profile-page',
    templateUrl: './user-profile-page.component.html',
    styleUrls: ['./user-profile-page.component.scss'],
})
export class UserProfilePageComponent implements OnInit {
    id: number;
    user: User = {
        _id: null,
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
        this.id = this.activatedRoute.snapshot.params.id;
    }

    likeUser() {
        console.log('You like that user with ID ' + this.id);
    }
}
