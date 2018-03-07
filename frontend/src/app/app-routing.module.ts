import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ComicsComponent } from './components/comics/comics.component';
import { AuthGuard } from './guards/auth.guard';
import { NotAuthGuard } from './guards/notAuth.guard';

const appRoutes: Routes = [
    {
        path: '',
        component: HomeComponent // Home page
    },
    {
        path: 'dashboard',
        component: DashboardComponent, // Go to dashboard
        canActivate: [AuthGuard]
    },
    {
        path: 'comics',
        component: ComicsComponent, // Go to dashboard
        canActivate: [AuthGuard]
    },
    {
        path: 'registration',
        component: RegistrationComponent, // Go to Registration
        canActivate: [NotAuthGuard]
    },
    {
        path: 'login',
        component: LoginComponent, // Go to Login
        canActivate: [NotAuthGuard]
    },
    {
        path: 'profile',
        component: ProfileComponent, // Go to Profile
        canActivate: [AuthGuard]
    },
    {
        path: '**',
        component: HomeComponent // Else return to home
    }
];

@NgModule({
    declarations: [],
    imports: [RouterModule.forRoot(appRoutes)],
    providers: [],
    bootstrap: [],
    exports: [RouterModule]
})

export class AppRoutingModule { }
