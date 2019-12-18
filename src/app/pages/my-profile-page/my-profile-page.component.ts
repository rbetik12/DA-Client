import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { PhotoService } from '../../services/photo.service';

import { MatListOption } from '@angular/material';
import { User } from '../../models/user.interface';
import { HttpClient } from '@angular/common/http';
import { Endpoints } from '../../endpoints';
import { UserService } from '../../services/user.service';

export class DelPhotoIndex {
    [index: number]: number;
}

@Component({
    selector: 'app-profile-page',
    templateUrl: './my-profile-page.component.html',
    styleUrls: ['./my-profile-page.component.scss'],
})
export class MyProfilePageComponent implements OnInit {

    width: number;
    deletePhoto = false;
    delPhotosIndexes: DelPhotoIndex = {};
    userInfo: User;

    constructor(private auth: AuthService,
                public router: Router,
                private platform: Platform,
                public photoService: PhotoService,
                private http: HttpClient,
                private userService: UserService) {
    }

    ngOnInit() {
        this.userInfo = this.userService.getCredentials();
        this.width = this.platform.width();
        this.photoService.loadSaved();
    }

    logout() {
        this.auth.logout();
        this.router.navigateByUrl('/login').then(r => {
        });
    }

    onPhotoClick(photo) {
        if (photo.src) {
            this.deletePhoto = !this.deletePhoto;
        }
    }

    onCheckBoxClick(event, delPhotoIndex: number) {
        if (event.checked) {
            this.delPhotosIndexes[delPhotoIndex] = delPhotoIndex;
        } else {
            this.delPhotosIndexes[delPhotoIndex] = -1;
        }
    }

    deletePhotos() {
        console.log(Object.keys(this.delPhotosIndexes));
        for (const index of Object.keys(this.delPhotosIndexes)) {
            if (this.delPhotosIndexes[index] !== -1) {
                console.log(index);
                console.log(this.delPhotosIndexes[index]);
                delete this.photoService.photos[index];
                console.log(this.photoService.photos[index]);
            }
        }
        this.photoService.photos = this.photoService.photos.filter((el) => {
            return el != null;
        });
        this.deletePhoto = !this.deletePhoto;
        this.clearIndexesArray();
        if (this.photoService.photos.length === 0) {
            this.photoService.setDefault();
        }
        this.photoService.updateStorage();
    }

    clearIndexesArray() {
        this.delPhotosIndexes = {};
    }

    onInterestSelect(selectedOptions: MatListOption[]) {
        this.userInfo.interests = [];
        for (const category of selectedOptions) {
            this.userInfo.interests.push(category.value);
        }
        this.updateProfile(this.userInfo);
    }

    changeAboutMe() {
        this.updateProfile(this.userInfo);
    }

    private setSelectedInterests() {

    }

    private updateProfile(user: User) {
        this.userService.updateCredentials(user);
        this.http.post<User>(Endpoints.profile, {user}).subscribe(res => {
            console.log(res);
        });
    }
}
