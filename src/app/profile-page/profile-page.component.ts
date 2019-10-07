import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { PhotoService } from '../services/photo.service';

@Component({
    selector: 'app-profile-page',
    templateUrl: './profile-page.component.html',
    styleUrls: ['./profile-page.component.scss'],
})
export class ProfilePageComponent implements OnInit {

    width: number;
    deletePhoto = false;

    constructor(private auth: AuthService,
                private router: Router,
                private platform: Platform,
                private photoService: PhotoService) {
    }

    ngOnInit() {
        this.width = this.platform.width();
        this.photoService.loadSaved();
        console.log(this.photoService.photos);
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
}
