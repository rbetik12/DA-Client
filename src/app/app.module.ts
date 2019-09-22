import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { MatFormFieldModule, MatInputModule, MatRadioModule, MatTreeModule } from '@angular/material';

import { AppComponent } from './app.component';
import { RegisterPageComponent } from './register-page/register-page.component';

const routes: Routes = [
    {
        path: '', component: RegisterPageComponent
    }
];

@NgModule({
    declarations: [
        AppComponent,
        RegisterPageComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        RouterModule.forRoot(routes),
        MatInputModule,
        MatFormFieldModule,
        MatRadioModule,
        MatTreeModule,
    ],
    exports: [
        MatInputModule,
        MatFormFieldModule,
        MatRadioModule,
        MatTreeModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {
}
