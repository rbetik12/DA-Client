import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ChatService} from '../../services/chat.service';
import {MessageModel} from '../../models/message.model';
import {UserService} from '../../services/user.service';
import {Endpoints} from '../../endpoints';
import {HttpClient} from '@angular/common/http';
import {User} from '../../models/user.interface';
import {PrivateMessage} from '../../models/private-message.model';

@Component({
    selector: 'app-private-chat-page',
    templateUrl: './private-chat-page.component.html',
    styleUrls: ['./private-chat-page.component.scss'],
})
export class PrivateChatPageComponent implements OnInit {
    twimcId: string;
    messages: PrivateMessage[];
    room: string;
    messageText: string;
    id: string;
    twimcUser: User = {
        name: null,
        _id: null,
        about: null,
        age: null,
        email: null,
        gender: null,
        interests: null,
        likes: null,
        password: null
    };

    constructor(private activatedRoute: ActivatedRoute,
                private chatService: ChatService,
                private userService: UserService,
                private router: Router,
                private http: HttpClient) {
    }

    ngOnInit() {
        this.id = this.userService.getUserId();
        this.messages = [];
        this.twimcId = this.activatedRoute.snapshot.params.id;
        this.http.get(Endpoints.profile + '/' + this.twimcId).subscribe((res: User) => {
            console.log(res);
            this.twimcUser = res;
        });
        this.chatService.emit('subscribe', {twimcId: this.twimcId, senderId: this.userService.getUserId()});
        this.chatService.listen('getRoomId').subscribe((res: string) => {
            this.room = res;
        });
        this.chatService.listen('getMessagesFromDB').subscribe(res => {
            const privateMessages: PrivateMessage[] = Object.values(res);
            this.messages = privateMessages.concat(this.messages);
        });
        this.chatService.listen('getMessage').subscribe((res: PrivateMessage) => {
            this.messages.push(res);
            console.log(this.messages);
        });
    }

    sendMessage() {
        this.chatService.emit('sendPMessage', {
            twimcId: this.twimcId,
            senderId: this.userService.getUserId(),
            text: this.messageText,
            roomId: this.room,
            senderName: this.userService.getCredentials().name
        });
        this.messageText = '';
    }

    toPM() {
        this.router.navigateByUrl('/private-chats');
    }
}
