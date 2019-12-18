import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Endpoints } from '../../endpoints';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.interface';

@Component({
    selector: 'app-likes-page',
    templateUrl: './likes-page.component.html',
    styleUrls: ['./likes-page.component.scss'],
})
export class LikesPageComponent implements OnInit {

    private usersWhoLiked: User[] = [];

    constructor(private http: HttpClient,
                private userService: UserService) {
    }

    ngOnInit() {
        console.log(this.userService.getUserId());
        this.http.get(Endpoints.userLikes + '/' + this.userService.getUserId()).subscribe(res => {
            this.usersWhoLiked = Object.values(res);
            console.log(this.usersWhoLiked);
        });
    }

}
