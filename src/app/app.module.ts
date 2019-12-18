import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Camera } from '@ionic-native/camera/ngx';
import { IonicStorageModule } from '@ionic/storage';
import { Geolocation } from '@ionic-native/geolocation/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatInputModule, MatListModule, MatRadioModule } from '@angular/material';
import { InterestsListComponent } from './components/interests-list/interests-list.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TopBarComponent } from './components/top-bar/top-bar.component';
import { AuthService } from './services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { AuthGuard } from './services/auth.guard';
import { MyProfilePageComponent } from './pages/my-profile-page/my-profile-page.component';
import { ChatPageComponent } from './pages/chat-page/chat-page.component';
import { BottomBarComponent } from './components/bottom-bar/bottom-bar.component';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { Endpoints } from './endpoints';
import { UserProfilePageComponent } from './pages/user-profile-page/user-profile-page.component';
import { LikesPageComponent } from './pages/likes-page/likes-page.component';

const config: SocketIoConfig = {url: Endpoints.globalChat, options: {}};

@NgModule({
    declarations: [
        AppComponent,
        LoginPageComponent,
        InterestsListComponent,
        RegisterPageComponent,
        TopBarComponent,
        MyProfilePageComponent,
        ChatPageComponent,
        BottomBarComponent,
        UserProfilePageComponent,
        LikesPageComponent
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
        SocketIoModule.forRoot(config)
    ],
    providers: [
        StatusBar,
        SplashScreen,
        AuthService,
        AuthGuard,
        Camera,
        Geolocation,
        {provide: RouteReuseStrategy, useClass: IonicRouteStrategy}
    ],
    exports: [
        MatRadioModule,
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
