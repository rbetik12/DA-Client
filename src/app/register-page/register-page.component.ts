import { Component } from '@angular/core';
import { MatListOption } from '@angular/material';

@Component({
    selector: 'app-register-page',
    templateUrl: './register-page.component.html',
    styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent {

    onSelect(selectedOptions: MatListOption[]) {
        for (const a of selectedOptions) {
            console.log(a.value);
        }
    }

}
