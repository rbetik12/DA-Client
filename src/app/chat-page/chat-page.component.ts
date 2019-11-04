import { Component, OnInit } from '@angular/core';
import { ChatService } from '../services/chat.service';

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
export class ChatPageComponent implements OnInit {

    id: number;
    mMessage = '';
    mSender = 'Vitaliy';
    messages: MessageModel[] = [];

    constructor(private chatService: ChatService) {
    }

    ngOnInit() {
        this.id = Math.random() * (1000);
        this.chatService.listen('join').subscribe((messages: MessageModel[]) => {
            this.messages = messages;
        });
        this.chatService.listen('newMessage').subscribe((message: MessageModel) => {
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
}
