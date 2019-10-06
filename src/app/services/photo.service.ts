import { Injectable } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

export interface Photo {
    data: any;
}

@Injectable({
    providedIn: 'root'
})
export class PhotoService {

    public photos: Photo[] = [
        {
            data: 'https://www.idyllwildarts.org/wp-content/uploads/2016/09/blank-profile-picture.jpg',
        }
    ];

    constructor(private camera: Camera) {
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
        }, (err) => {
            // Handle error
            console.log('Camera issue: ' + err);
        });
    }
}
