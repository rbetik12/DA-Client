import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Component({
    selector: 'app-profile-page',
    templateUrl: './profile-page.component.html',
    styleUrls: ['./profile-page.component.scss'],
})
export class ProfilePageComponent implements OnInit {

    images: string[];
    title = 'Profile';
    width: number;
    height: number;
    currentImage: any;

    constructor(private auth: AuthService,
                private router: Router,
                private platform: Platform,
                private camera: Camera) {
    }

    ngOnInit() {
        this.width = this.platform.width();
        this.height = this.platform.height();
        this.images = [
            'https://images.pexels.com/photos/247878/pexels-photo-247878.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
            'https://previews.123rf.com/images/keilikeramen/keilikeramen1404/keilikeramen140400008/27276764-yellow-folwer.jpg',
            'https://images.pexels.com/photos/1391498/pexels-photo-1391498.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
            'https://i.pinimg.com/originals/0c/be/70/0cbe7083860570be19598ce6e64e06fb.jpg',
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNN-zIDzDYTxCEApLR8IT8JJ-6G3oFWMc1klbDfIoY6IEsEmubaQ',
        ];
    }

    logout() {
        this.auth.logout();
        this.router.navigateByUrl('/login').then(r => {
        });
    }

    takePicture() {
        const options: CameraOptions = {
            quality: 100,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE
        };

        this.camera.getPicture(options).then((imageData) => {
            this.currentImage = 'data:image/jpeg;base64,' + imageData;
        }, (err) => {
            // Handle error
            console.log('Camera issue:' + err);
        });
    }
}
