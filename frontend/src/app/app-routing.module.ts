import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RegistrationComponent } from './components/registration/registration.component';

const appRoutes: Routes = [
    {
        path: '',
        component: HomeComponent // Home page
    },
    {
        path: 'dashboard',
        component: DashboardComponent // Go to dashboard
    },
    {
        path: 'registration',
        component: RegistrationComponent // Go to Registration
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
