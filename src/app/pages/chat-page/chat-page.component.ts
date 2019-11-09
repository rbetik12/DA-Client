import { Component, OnDestroy, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { Subscription } from 'rxjs';
import { AlertErrorService } from '../../services/alert-error.service';
import { Router } from '@angular/router';

export interface MessageModel {
    id: number;
    sender: string;
    text: string;
    liked?: boolean;
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
    private connectionErrorSub: Subscription;

    constructor(private chatService: ChatService, private alertService: AlertErrorService, private router: Router) {
    }

    ngOnInit() {
        console.log('Init event');
        this.id = Math.random() * (1000);
        this.joinSub = this.chatService.listen('join').subscribe((messages: MessageModel[]) => {
            console.log('Join event');
            console.table(messages);
            this.messages = messages;
            this.messages.push({
                id: 1,
                sender: 'kek',
                text: 'lol'
            });
        });
        this.newMessageSub = this.chatService.listen('newMessage').subscribe((message: MessageModel) => {
            this.messages.push(message);
        });
        this.connectionErrorSub = this.chatService.listen('connect_error').subscribe(() => {
            console.log('error');
            this.alertService.createHandledOkErrorAlert('Server connection error',
                'Server might be down. You will be navigated to main screen', () => {
                    this.router.navigateByUrl('');
                });
            this.connectionErrorSub.unsubscribe();
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
        this.connectionErrorSub.unsubscribe();
    }

    openProfile(userID: number) {
        this.router.navigateByUrl('/profile/' + userID);
    }

    likeMessage(likedMessage: MessageModel) {
        console.log('Liked');
        for (const message of this.messages) {
            if (message.text === likedMessage.text) {
                message.liked = message.liked ? !message.liked : true;
            }
        }
    }
}
