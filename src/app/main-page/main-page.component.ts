import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-main-page',
    templateUrl: './main-page.component.html',
    styleUrls: ['./main-page.component.css']
})
export class MainPageComponent {

    constructor(private auth: AuthService, private router: Router) {
    }

    logout() {
        this.auth.logout();
        this.router.navigateByUrl('/login').then(r => {
        });
    }
}
