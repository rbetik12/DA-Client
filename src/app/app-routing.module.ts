import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
    {path: '', component: ProfilePageComponent, canActivate: [AuthGuard]},
    {path: 'login', component: LoginPageComponent},
    {path: 'register', component: RegisterPageComponent}
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
