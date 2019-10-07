import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { PhotoService } from '../services/photo.service';

export class DelPhotoIndex {
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

    delPhotosIndexes: DelPhotoIndex = {};

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

    private clearIndexesArray() {
        this.delPhotosIndexes = {};
    }
}
