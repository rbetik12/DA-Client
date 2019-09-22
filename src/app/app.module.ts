import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';

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
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
