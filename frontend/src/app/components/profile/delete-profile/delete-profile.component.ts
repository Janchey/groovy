import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete-profile',
  templateUrl: './delete-profile.component.html',
  styleUrls: ['./delete-profile.component.css']
})
export class DeleteProfileComponent implements OnInit {

  showMessage;
  message;
  lockSubmit = false;
  profileIsFound = false;
  user;
  currentUrl;

  constructor(
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  deleteThisProfile(){
    this.lockSubmit = true;
    this.authService.deleteProfile(this.currentUrl.id).subscribe(data => {
      if(!data.success) {
        this.showMessage = 'alert alert-danger';
        this.message = data.message;
      } else {
        this.showMessage = 'alert alert-success';
        this.message = data.message;
        setTimeout(() => {
          this.authService.logout();
          this.router.navigate(['../../']);
        },4000);
      }
    });
  }

  ngOnInit() {
    this.currentUrl = this.activatedRoute.snapshot.params;
    this.authService.getUserId(this.currentUrl.id).subscribe(data => {
      if (!data.success) {
        this.showMessage = 'alert alert-danger';
        this.message = 'User not found';
      } else {
        this.user = {
          username: data.user.username,
          email: data.user.email,
          password: data.user.password
        }
        this.profileIsFound = true;
      }
    });
  }

}
