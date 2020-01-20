import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Endpoints} from '../../endpoints';
import {UserService} from '../../services/user.service';
import {User} from '../../models/user.interface';
import {Like} from '../../models/like.model';
import {LoadingService} from '../../services/loading.service';

@Component({
    selector: 'app-likes-page',
    templateUrl: './likes-page.component.html',
    styleUrls: ['./likes-page.component.scss'],
})
export class LikesPageComponent implements OnInit {

    private usersWhoLiked: User[] = [];

    constructor(private http: HttpClient,
                private userService: UserService,
                private loadingService: LoadingService) {
    }

    loading;

    async ngOnInit() {
        this.loading = await this.loadingService.presentLoading('Loading likes').then(res => {
            return res;
        });
        this.loading.present();
        console.log(this.userService.getUserId());
        this.http.get(Endpoints.userLikes + '/' + this.userService.getUserId()).subscribe(res => {
            this.usersWhoLiked = Object.values(res);
            console.log(this.usersWhoLiked);
            this.loading.dismiss();
        });
    }

    async likeUser(index: number) {
        this.loading = await this.loadingService.presentLoading('Please wait').then(res => {
            return res;
        });
        this.loading.present();
        this.http.post<Like>(Endpoints.like, {
            userId: this.userService.getCredentials()._id,
            userWhoGetLiked: this.usersWhoLiked[index]._id,
        }, {observe: 'response'}).subscribe((res) => {
            console.log(res);
            this.loading.dismiss();
        }, error => {
            this.loading.dismiss();
        });
    }
}
