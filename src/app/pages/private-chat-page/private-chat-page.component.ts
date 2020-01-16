import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-private-chat-page',
    templateUrl: './private-chat-page.component.html',
    styleUrls: ['./private-chat-page.component.scss'],
})
export class PrivateChatPageComponent implements OnInit {
    userId: string;

    constructor(private activatedRoute: ActivatedRoute) {
    }

    ngOnInit() {
        this.userId = this.activatedRoute.snapshot.params.id;
    }

}
