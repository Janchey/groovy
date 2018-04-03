import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { FlashMessagesModule } from 'angular2-flash-messages';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { HomeComponent } from './components/home/home.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { AuthService } from './services/auth.service';
import { ComicsService } from './services/comics.service';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AuthGuard } from './guards/auth.guard';
import { NotAuthGuard } from './guards/notAuth.guard';
import { ComicsComponent } from './components/comics/comics.component';
import { EditComicsComponent } from './components/comics/edit-comics/edit-comics.component';
import { DeleteComicComponent } from './components/comics/delete-comic/delete-comic.component';
import { PublicProfileComponent } from './components/public-profile/public-profile.component';
import { EditProfileComponent } from './components/profile/edit-profile/edit-profile.component';
import { DeleteProfileComponent } from './components/profile/delete-profile/delete-profile.component';


@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    HomeComponent,
    RegistrationComponent,
    LoginComponent,
    ProfileComponent,
    ComicsComponent,
    EditComicsComponent,
    DeleteComicComponent,
    PublicProfileComponent,
    EditProfileComponent,
    DeleteProfileComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule,
    FormsModule,
    FlashMessagesModule.forRoot()
  ],
  providers: [AuthService, AuthGuard, NotAuthGuard, ComicsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
