import { Component, OnInit, group } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  registerForm: FormGroup;
  showMessage;
  message;
  lockSubmit = false;
  emailValid;
  emailMessage;
  usernameValid;
  usernameMessage;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.createRegisterForm();
  }

  createRegisterForm() {
    this.registerForm = this.formBuilder.group(
      {
        email: ['', Validators.compose([
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(40),
          this.validateEmail
        ])],
        username: ['', Validators.compose([
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(22),
          this.validateUsername
        ])],
        password: ['', Validators.compose([
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(25),
          this.validatePass
        ])],
        confirm: ['', Validators.required],
      }, {validator: this.confirmPass('password', 'confirm')}
    );
  }

  lockForm() {
    this.registerForm.controls['email'].disable();
    this.registerForm.controls['username'].disable();
    this.registerForm.controls['password'].disable();
    this.registerForm.controls['confirm'].disable();

  }

  unlockForm(){
    this.registerForm.controls['email'].enable();
    this.registerForm.controls['username'].enable();
    this.registerForm.controls['password'].enable();
    this.registerForm.controls['confirm'].enable();

  }

  validateEmail(controls){
    const regExp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    regExp.test(controls.value);  
    if (regExp.test(controls.value)){
      return null;
    } else{
      return { 'validateEmail': true }
    }
  }

  validateUsername(controls){
    const regExp = new RegExp(/^[a-zA-Z0-9]+$/);
    regExp.test(controls.value);  
    if (regExp.test(controls.value)){
      return null;
    } else{
      return { 'validateUsername': true }
    }
  }

  validatePass(controls){
    const regExp = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/);
    regExp.test(controls.value);  
    if (regExp.test(controls.value)){
      return null;
    } else{
      return { 'validatePass': true }
    }
  }

  confirmPass(password, confirm){
    return (group: FormGroup) => {
      if (group.controls[password].value === group.controls[confirm].value){
        return null;
      }
      else{
        return { 'confirmPass': true }
      }
    }
  }

  onRegisterFormSubmit(){
    this.lockSubmit = true;
    this.lockForm();
    const user = {
      email: this.registerForm.get('email').value,
      username: this.registerForm.get('username').value,
      password: this.registerForm.get('password').value
    }

    this.authService.registerUser(user).subscribe(data => {
      if (!data.success){
        this.showMessage = 'alert alert-danger';
        this.message = data.message;
        this.lockSubmit = false;
        this.unlockForm();

      } else{
        this.showMessage = 'alert alert-success';
        this.message = data.message;
        setTimeout(() =>{
          this.router.navigate(['/login']);
        },2000)
      }
    });
    
  }

  checkEmail() {
    const email = this.registerForm.get('email').value;
    this.authService.checkEmail(email).subscribe(data => {
      if(!data.success){
        this.emailValid = false;
        this.emailMessage = data.message;
      } else {
        this.emailValid = true;
        this.emailMessage = data.message;
      }
    });
  }

  
  checkUsername() {
    const username = this.registerForm.get('username').value;
    this.authService.checkUsername(username).subscribe(data => {
      if(!data.success){
        this.usernameValid = false;
        this.usernameMessage = data.message;
      } else {
        this.usernameValid = true;
        this.usernameMessage = data.message;
      }
    });
  }


  ngOnInit() {
  }

}
