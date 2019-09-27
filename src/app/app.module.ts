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
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { InterestsListComponent } from './interests-list/interests-list.component';
import { FormsModule } from '@angular/forms';
import { LoginPageComponent } from './login-page/login-page.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { MainPageComponent } from './main-page/main-page.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
    {
        path: '', component: MainPageComponent, canActivate: [AuthGuard]
    },
    {
        path: 'register', component: RegisterPageComponent
    },
    {
        path: 'login', component: LoginPageComponent
    }
];

@NgModule({
    declarations: [
        AppComponent,
        RegisterPageComponent,
        InterestsListComponent,
        LoginPageComponent,
        TopBarComponent,
        MainPageComponent,
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
        ReactiveFormsModule,
        HttpClientModule
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
