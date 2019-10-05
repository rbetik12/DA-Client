import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-profile-page',
    templateUrl: './profile-page.component.html',
    styleUrls: ['./profile-page.component.scss'],
})
export class ProfilePageComponent {

    title = 'Profile';

    constructor(private auth: AuthService, private router: Router) {
    }

    logout() {
        this.auth.logout();
        this.router.navigateByUrl('/login').then(r => {
        });
    }
}
