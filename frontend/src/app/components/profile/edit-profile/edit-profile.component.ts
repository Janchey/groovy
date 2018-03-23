import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  showMessage;
  message;
  lockSubmit = false;
  curentUrl;
  user;
  loading = true;

  constructor(
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private router: Router
  ) { }

  onEditProfileFormSubmit() {
    this.lockSubmit = true;
    this.authService.editProfile(this.user).subscribe(data => {
      if(!data.success){
        this.showMessage = 'alert alert-danger';
        this.message = data.message;
        this.lockSubmit = false;
      } else {
        this.showMessage = 'alert alert-success';
        this.message = data.message;
        setTimeout(() => {
          this.router.navigate(['/profile']);
        }), 2000;
      }
    });
  }

  goBack() {
    this.location.back();
  }

  ngOnInit() {
    this.curentUrl = this.activatedRoute.snapshot.params;
    this.authService.getUserId(this.curentUrl.id).subscribe(data => {
      if (!data.success) {
        this.showMessage = 'alert alert-danger';
        this.message = 'User not found';
      } else {
        this.user = data.user;
        this.loading = false;
      }
    });

  }

}
