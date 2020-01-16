import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {LoginPageComponent} from './pages/login-page/login-page.component';
import {RegisterPageComponent} from './pages/register-page/register-page.component';
import {MyProfilePageComponent} from './pages/my-profile-page/my-profile-page.component';
import {ChatPageComponent} from './pages/chat-page/chat-page.component';
import {UserProfilePageComponent} from './pages/user-profile-page/user-profile-page.component';
import {AuthGuard} from './services/auth.guard';
import {LikesPageComponent} from './pages/likes-page/likes-page.component';
import {PrivateChatsPageComponent} from './pages/private-chats-page/private-chats-page.component';
import {PrivateChatPageComponent} from './pages/private-chat-page/private-chat-page.component';

const routes: Routes = [
    {path: '', component: MyProfilePageComponent, canActivate: [AuthGuard]},
    {path: 'login', component: LoginPageComponent},
    {path: 'register', component: RegisterPageComponent},
    {path: 'chat', component: ChatPageComponent, canActivate: [AuthGuard]},
    {path: 'profile/:id', component: UserProfilePageComponent, canActivate: [AuthGuard]},
    {path: 'likes', component: LikesPageComponent, canActivate: [AuthGuard]},
    {path: 'private-chats', component: PrivateChatsPageComponent, canActivate: [AuthGuard]},
    {path: 'private-chat/:id', component: PrivateChatPageComponent, canActivate: [AuthGuard]}
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
