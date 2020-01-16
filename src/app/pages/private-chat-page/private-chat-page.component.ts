import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
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

    constructor(private activatedRoute: ActivatedRoute,
                private chatService: ChatService,
                private userService: UserService) {
    }

    ngOnInit() {
        this.messages = [];
        this.twimcId = this.activatedRoute.snapshot.params.id;
        this.chatService.emit('subscribe', {twimcId: this.twimcId, senderId: this.userService.getUserId()});
        this.chatService.listen('getRoomId').subscribe((res: string) => {
            this.room = res;
        });
        this.chatService.listen('getMessage').subscribe((res: MessageModel) => {
            this.messages.push(res);
        });
    }

    sendMessage() {
        console.log(this.messageText);
    }
}
