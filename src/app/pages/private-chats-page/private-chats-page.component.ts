import {Component, OnInit} from '@angular/core';
import {User} from '../../models/user.interface';
import {HttpClient} from '@angular/common/http';
import {Endpoints} from '../../endpoints';
import {UserService} from '../../services/user.service';
import {Socket} from 'ngx-socket-io';
import {Router} from "@angular/router";

@Component({
    selector: 'app-private-chats-page',
    templateUrl: './private-chats-page.component.html',
    styleUrls: ['./private-chats-page.component.scss'],
})
export class PrivateChatsPageComponent implements OnInit {

    mutualLikeUsers: User[];

    constructor(private http: HttpClient,
                private userService: UserService,
                private router: Router) {
    }

    ngOnInit() {
        this.http.get(Endpoints.getMutualUsers + this.userService.getUserId()).subscribe((res: User[]) => {
            this.mutualLikeUsers = res;
        });

    }

    openChat(id: string) {
        this.router.navigateByUrl('/private-chat/' + id);
    }

}
