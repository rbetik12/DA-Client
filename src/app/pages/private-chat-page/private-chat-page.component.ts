import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ChatService} from '../../services/chat.service';
import {MessageModel} from '../../models/message.model';
import {UserService} from '../../services/user.service';

@Component({
    selector: 'app-private-chat-page',
    templateUrl: './private-chat-page.component.html',
    styleUrls: ['./private-chat-page.component.scss'],
})
export class PrivateChatPageComponent implements OnInit {
    twimcId: string;
    messages: MessageModel[] = [{_id: '2', latitude: 20, longitude: 20, sender: 'kek', text: 'lol', userID: 'lol'}];
    room: string;
    messageText: string;
    id: string;
    constructor(private activatedRoute: ActivatedRoute,
                private chatService: ChatService,
                private userService: UserService,
                private router: Router) {
    }

    ngOnInit() {
        this.id = this.userService.getUserId();
        this.messages = [];
        this.twimcId = this.activatedRoute.snapshot.params.id;
        this.chatService.emit('subscribe', {twimcId: this.twimcId, senderId: this.userService.getUserId()});
        this.chatService.listen('getRoomId').subscribe((res: string) => {
            this.room = res;
        });
        this.chatService.listen('getMessage').subscribe((res: MessageModel) => {
            this.messages.push(res);
            console.log(this.messages);
        });
    }

    sendMessage() {
        this.chatService.emit('sendPMessage', {
            twimcId: this.twimcId,
            senderId: this.userService.getUserId(),
            text: this.messageText,
            roomId: this.room
        });
        this.messageText = '';
    }

    toPM() {
        this.router.navigateByUrl('/private-chats');
    }
}
