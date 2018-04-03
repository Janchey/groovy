import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { AuthGuard } from '../../guards/auth.guard';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  showMessage;
  message;
  lockSubmit = false;
  previusURL;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private authGuard: AuthGuard
  ) { this.createLoginForm();}

  createLoginForm() {
    this.loginForm = this.formBuilder.group(
      {
        username: ['', Validators.required],

        password: ['', Validators.required]
      }
    );
  }

  
  lockForm() {
    this.loginForm.controls['username'].disable();
    this.loginForm.controls['password'].disable();
  }

  unlockForm(){
    this.loginForm.controls['username'].enable();
    this.loginForm.controls['password'].enable();
  }

  onLoginFormSubmit(){
    this.lockSubmit = true;
    this.lockForm();
    const user = {
      username: this.loginForm.get('username').value,
      password: this.loginForm.get('password').value
    }
    
    this.authService.login(user).subscribe(data =>{
      if (!data.success){
        this.showMessage = 'alert alert-danger';
        this.message = data.message;
        this.lockSubmit = false;
        this.unlockForm();
      } else{
        this.showMessage = 'alert alert-success';
        this.message = data.message;
        this.authService.storeUserData(data.token, data.user);
        setTimeout(() =>{
          if(this.previusURL){
            this.router.navigate([this.previusURL]);
          } else {
            this.router.navigate(['/comics']);
          }
          
        },2000);
      }
    });
  }

  ngOnInit() {
    if(this.authGuard.redirectUrl){
      this.showMessage = 'alert alert-danger';
      this.message = 'You must be logged in to view this page';
      this.previusURL = this.authGuard.redirectUrl;
      this.authGuard.redirectUrl = undefined;
    }
  }

}
