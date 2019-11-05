import { Component, OnDestroy, OnInit } from '@angular/core';
import { ChatService } from '../services/chat.service';
import { Subscription } from 'rxjs';

export interface MessageModel {
    id: number;
    sender: string;
    text: string;
}

@Component({
    selector: 'app-chat-page',
    templateUrl: './chat-page.component.html',
    styleUrls: ['./chat-page.component.scss'],
})
export class ChatPageComponent implements OnInit, OnDestroy {

    id: number;
    mMessage = '';
    mSender = 'Vitaliy';
    messages: MessageModel[] = [];
    private joinSub: Subscription;
    private newMessageSub: Subscription;

    constructor(private chatService: ChatService) {
    }

    ngOnInit() {
        console.log('Init event');
        this.id = Math.random() * (1000);
        this.joinSub = this.chatService.listen('join').subscribe((messages: MessageModel[]) => {
            console.log('Join event');
            console.table(messages);
            this.messages = messages;
        });
        this.newMessageSub = this.chatService.listen('newMessage').subscribe((message: MessageModel) => {
            this.messages.push(message);
        });
        this.chatService.emit('join', this.id);
    }

    sendMessage() {
        this.chatService.emit('newMessage', {
            id: this.id,
            sender: this.mSender,
            text: this.mMessage
        });
    }

    ngOnDestroy() {
        console.log('Destroy event');
        this.joinSub.unsubscribe();
        this.newMessageSub.unsubscribe();
    }
}
