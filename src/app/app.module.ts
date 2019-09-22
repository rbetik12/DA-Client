import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import {
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatListModule,
    MatTreeModule,
    MatCheckboxModule,
    MatIconModule,
    MatButtonModule,
} from '@angular/material';

import { AppComponent } from './app.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { InterestsListComponent } from './interests-list/interests-list.component';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
    {
        path: '', component: RegisterPageComponent,
    },
];

@NgModule({
    declarations: [
        AppComponent,
        RegisterPageComponent,
        InterestsListComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        RouterModule.forRoot(routes),
        MatInputModule,
        MatFormFieldModule,
        MatRadioModule,
        MatListModule,
        MatTreeModule,
        MatCheckboxModule,
        MatIconModule,
        MatButtonModule,
        FormsModule,
    ],
    exports: [
        MatInputModule,
        MatFormFieldModule,
        MatRadioModule,
        MatListModule,
        MatTreeModule,
        MatCheckboxModule,
        MatIconModule,
        MatButtonModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {
}
