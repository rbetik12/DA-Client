import { Injectable } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Storage } from '@ionic/storage';
import { Photo } from '../models/photo.model';
import { AuthService } from './auth.service';


@Injectable({
    providedIn: 'root'
})
export class PhotoService {

    public photos: Photo[];

    constructor(private camera: Camera, private storage: Storage, private auth: AuthService) {
    }

    takePicture() {
        const options: CameraOptions = {
            quality: 100,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE
        };

        this.camera.getPicture(options).then((imageData) => {
            if (this.photos[0].data.match(/https:/g)) {
                this.photos.pop();
            }
            this.photos.unshift({
                data: 'data:image/jpeg;base64,' + imageData
            });
            this.updateStorage();
        }, (err) => {
            // Handle error
            console.log('Camera issue: ' + err);
        });
    }

    loadSaved() {
        this.storage.get('photos').then((photos) => {
            this.photos = photos ? photos : [{data: 'https://www.idyllwildarts.org/wp-content/uploads/2016/09/blank-profile-picture.jpg'}];
        });
    }

    setDefault() {
        this.photos.push({data: 'https://www.idyllwildarts.org/wp-content/uploads/2016/09/blank-profile-picture.jpg'});
    }

    updateStorage() {
        this.storage.set('photos', this.photos);
        const currentUser = this.auth.getCredentials();
        currentUser.images = this.photos;
        // this.auth.updateCredentials(currentUser);
    }
}
