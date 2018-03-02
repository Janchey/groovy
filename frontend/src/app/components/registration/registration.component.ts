import { Component, OnInit, group } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  registerForm: FormGroup;

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

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.createRegisterForm();
  }

  onRegisterFormSubmit(){
    console.log(this.registerForm);
  }



  ngOnInit() {
  }

}
