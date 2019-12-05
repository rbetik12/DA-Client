import { Component, OnDestroy, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { Subscription } from 'rxjs';
import { AlertErrorService } from '../../services/alert-error.service';
import { Router } from '@angular/router';
import { MessageModel } from '../../models/message.model';
import { UserService } from '../../services/user.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@Component({
    selector: 'app-chat-page',
    templateUrl: './chat-page.component.html',
    styleUrls: ['./chat-page.component.scss'],
})
export class ChatPageComponent implements OnInit, OnDestroy {

    id = '';
    mMessage = '';
    mSender = '';
    messages: MessageModel[] = [];
    latitude = 0;
    longitude = 0;
    private joinSub: Subscription;
    private newMessageSub: Subscription;
    private connectionErrorSub: Subscription;

    constructor(private chatService: ChatService,
                private alertService: AlertErrorService,
                private router: Router,
                private userService: UserService,
                private geolocation: Geolocation) {
    }

    ngOnInit() {
        console.log('Init event');
        this.initGeolocation();
        this.setChatListeners();

        this.id = this.userService.getCredentials()._id;
        this.mSender = this.userService.getCredentials().name;

        this.chatService.emit('join', this.id);
    }

    sendMessage() {
        if (this.mMessage === '') {
            this.alertService.createOkErrorAlert('Empty message', 'You cannot send empty messages');
        } else {
            this.chatService.emit('newMessage', {
                userID: this.id,
                sender: this.mSender,
                text: this.mMessage,
                latitude: this.latitude,
                longitude: this.longitude,
            });
            this.mMessage = '';
        }
    }

    private initGeolocation() {
        this.geolocation.getCurrentPosition().then((resp) => {
            this.latitude = resp.coords.latitude;
            this.longitude = resp.coords.longitude;
        }).catch((error) => {
            console.error(error);
            this.alertService.createHandledOkErrorAlert('Geolocation Error', 'Error in getting your geolocation. ' +
                'You will be navigated to main screen', () => {
                this.router.navigateByUrl('');
            });
        });
    }

    private setChatListeners() {
        this.joinSub = this.chatService.listen('join').subscribe((messages: MessageModel[]) => {
            console.log('Join event');
            console.table(messages);
            this.messages = Object.values(messages).map((message) => {
                message.text += ' ' + message.coefficient;
                return message;
            });
        });
        this.newMessageSub = this.chatService.listen('newMessage').subscribe((message: MessageModel) => {
            this.messages.push(message);
        });
        this.connectionErrorSub = this.chatService.listen('connect_error').subscribe(() => {
            console.log('error');
            this.alertService.createHandledOkErrorAlert('Server connection error',
                'Server might be down. You will be navigated to main screen.', () => {
                    this.router.navigateByUrl('');
                });
            this.connectionErrorSub.unsubscribe();
        });
    }

    ngOnDestroy() {
        console.log('Destroy event');
        this.joinSub.unsubscribe();
        this.newMessageSub.unsubscribe();
        this.connectionErrorSub.unsubscribe();
        this.messages = [];
    }

    openProfile(userID: string) {
        if (userID === this.id) {
            return;
        }
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
