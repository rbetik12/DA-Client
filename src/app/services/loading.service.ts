import {Injectable} from '@angular/core';
import {LoadingController} from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})
export class LoadingService {

    constructor(private loadingController: LoadingController) {
    }

    async presentLoading(loadingMessage: string): Promise<HTMLIonLoadingElement> {
        const loading = await this.loadingController.create({
            message: loadingMessage,
            duration: 30000
        });
        return loading;
    }
}
