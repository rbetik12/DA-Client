import { Injectable } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Storage } from '@ionic/storage';
import { Photo } from '../models/photo.model';
import { UserService } from './user.service';
import { Endpoints } from '../endpoints';
import { HttpClient } from '@angular/common/http';


@Injectable({
    providedIn: 'root'
})
export class PhotoService {

    public photos: Photo[] = [{data: 'https://www.idyllwildarts.org/wp-content/uploads/2016/09/blank-profile-picture.jpg'}];

    constructor(private camera: Camera,
                private storage: Storage,
                private userService: UserService,
                private http: HttpClient) {
    }

    takePicture() {
        const options: CameraOptions = {
            quality: 100,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE
        };

        this.camera.getPicture(options).then((imageData) => {
            if (this.photos[0] && this.photos[0].data.match(/https:/g)) {
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
        this.setUserPhotos();
    }

    setDefault() {
        this.photos.push({data: 'https://www.idyllwildarts.org/wp-content/uploads/2016/09/blank-profile-picture.jpg'});
    }

    updateStorage() {
        this.storage.set('photos', this.photos);
        this.http.post<Photo>(Endpoints.uploadPhoto, {
            user_id: this.userService.getCredentials()._id,
            data: this.photos[0]
        }).subscribe(res => {
            console.log(res);
        });
    }

    setUserPhotos() {
        if (this.userService.getUserId()) {
            this.http.get(Endpoints.getPhotos + '/' + this.userService.getCredentials()._id).subscribe(res => {
                const photosFromServer: Photo[] = Object.values(res);
                console.log(photosFromServer);
                this.photos = photosFromServer ? photosFromServer :
                    [{data: 'https://www.idyllwildarts.org/wp-content/uploads/2016/09/blank-profile-picture.jpg'}];
            });
        }
    }
}
