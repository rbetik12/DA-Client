import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Camera } from '@ionic-native/camera/ngx';
import { IonicStorageModule } from '@ionic/storage';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginPageComponent } from './login-page/login-page.component';
import { MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatInputModule, MatListModule, MatRadioModule } from '@angular/material';
import { InterestsListComponent } from './interests-list/interests-list.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TopBarComponent } from './top-bar/top-bar.component';
import { AuthService } from './services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { AuthGuard } from './services/auth.guard';
import { ProfilePageComponent } from './profile-page/profile-page.component';

@NgModule({
    declarations: [
        AppComponent,
        LoginPageComponent,
        InterestsListComponent,
        RegisterPageComponent,
        TopBarComponent,
        ProfilePageComponent
    ],
    entryComponents: [],
    imports: [
        HttpClientModule,
        BrowserModule,
        IonicModule.forRoot(),
        AppRoutingModule,
        BrowserAnimationsModule,
        MatRadioModule,
        MatCheckboxModule,
        MatListModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatInputModule,
        IonicStorageModule.forRoot(),
        FormsModule,
    ],
    providers: [
        StatusBar,
        SplashScreen,
        AuthService,
        AuthGuard,
        Camera,
        {provide: RouteReuseStrategy, useClass: IonicRouteStrategy}
    ],
    exports: [
        MatRadioModule,
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
