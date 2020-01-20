import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})
export class AlertErrorService {

    constructor(private alertController: AlertController) {
    }

    createOkErrorAlert(errorHeader: string, errorText: string) {
        this.alertController.create({
            header: errorHeader,
            message: errorText,
            buttons: ['Ok']
        }).then(alert => {
            alert.present();
        });
    }

    createHandledOkErrorAlert(errorHeader: string, errorText: string, mHandler: () => void) {
        this.alertController.create({
            header: errorHeader,
            message: errorText,
            buttons: [{
                text: 'Ok',
                handler: mHandler
            }]
        }).then(alert => {
            alert.present();
        });
    }
}
