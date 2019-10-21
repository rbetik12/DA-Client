import { Component } from '@angular/core';

export interface MessageModel {
    sender: string;
    text: string;
}

@Component({
    selector: 'app-chat-page',
    templateUrl: './chat-page.component.html',
    styleUrls: ['./chat-page.component.scss'],
})
export class ChatPageComponent {

    mSender = 'Vitaliy';
    messages: MessageModel[] = [
        {
            sender: 'Vitaliy',
            text: 'Plasmator fatalis abactor est.Albus adelphis grauiter promissios urbs est.'
        },
        {
            sender: 'Kek',
            text: 'Cum acipenser messis, omnes fortises experientia velox, regius pulchritudinees.Aonidess trabem, tanquam albus.'
        },
        {
            sender: 'Vitaliy',
            text: 'Pol, ionicis tormento!Pol, a bene particula, omnia!'
        }
    ];

    constructor() {
    }
}
