import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  username;
  email;
  password;
  id;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.authService.getProfile().subscribe(data =>{
      this.id = data.user._id;
      this.username = data.user.username;
      this.email = data.user.email;
    });
  }

}
