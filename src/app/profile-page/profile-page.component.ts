import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { PhotoService } from '../services/photo.service';

export class DelPhotoData {
    [index: number]: number;
}

@Component({
    selector: 'app-profile-page',
    templateUrl: './profile-page.component.html',
    styleUrls: ['./profile-page.component.scss'],
})
export class ProfilePageComponent implements OnInit {

    width: number;
    deletePhoto = false;

    delPhotosState: DelPhotoData = {};

    constructor(private auth: AuthService,
                private router: Router,
                private platform: Platform,
                private photoService: PhotoService) {
    }

    ngOnInit() {
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
            this.delPhotosState[delPhotoIndex] = delPhotoIndex;
        } else {
            this.delPhotosState[delPhotoIndex] = -1;
        }
    }

    deletePhotos() {
        console.log(Object.keys(this.delPhotosState));
        for (const index of Object.keys(this.delPhotosState)) {
            if (this.delPhotosState[index] !== -1) {
                console.log(index);
                console.log(this.delPhotosState[index]);
                delete this.photoService.photos[index];
                console.log(this.photoService.photos[index]);
            }
        }
        this.photoService.photos = this.photoService.photos.filter((el) => {
            return el != null;
        });
        this.deletePhoto = !this.deletePhoto;
    }
}
