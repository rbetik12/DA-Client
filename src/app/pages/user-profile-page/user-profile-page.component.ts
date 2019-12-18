import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../models/user.interface';
import { HttpClient } from '@angular/common/http';
import { Endpoints } from '../../endpoints';
import { Like } from '../../models/like.model';
import { UserService } from '../../services/user.service';

@Component({
    selector: 'app-user-profile-page',
    templateUrl: './user-profile-page.component.html',
    styleUrls: ['./user-profile-page.component.scss'],
})
export class UserProfilePageComponent implements OnInit {
    id = 0;
    user: User = {
        _id: null,
        name: null,
        about: null,
        interests: [],
        gender: null,
        age: null,
        email: null,
        photos: ['https://www.idyllwildarts.org/wp-content/uploads/2016/09/blank-profile-picture.jpg'],
    };
    width: number;

    constructor(private platform: Platform,
                private activatedRoute: ActivatedRoute,
                private http: HttpClient,
                private router: Router,
                private userService: UserService) {
    }

    ngOnInit() {
        this.width = this.platform.width();
        this.id = this.activatedRoute.snapshot.params.id;
        this.http.get(Endpoints.profile + '/' + this.id).subscribe((res: User) => {
            this.user = res;
            this.user.photos = ['https://www.idyllwildarts.org/wp-content/uploads/2016/09/blank-profile-picture.jpg'];
        });
    }

    likeUser() {
        console.log(this.id);
        if (this.id !== 0) {
            this.http.post<Like>(Endpoints.like, {
                userId: this.userService.getCredentials()._id,
                userWhoGetLiked: this.id
            }, {observe: 'response'}).subscribe((res) => {
                console.log(res);
            });
        }
    }

    toChat() {
        this.router.navigateByUrl('/chat');
    }
}
