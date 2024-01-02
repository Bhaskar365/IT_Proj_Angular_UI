import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ApiServiceService } from 'src/app/services/api.service.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  registerForm!: FormGroup;
  type: string = "password";
  isTextVisible: boolean = false;
  eyeIcon: string = "fa-eye-slash";
  displayMsg: string = '';
  spinnerLoading: boolean = true;
  responseMsg: any = '';
  successMsg:boolean = true;
  failMsg: boolean = true;

  isAccountCreated: boolean = false;

  constructor(private authServ: ApiServiceService, private router: Router) { }

  ngOnInit(): void {

    this.registerForm = new FormGroup({
      firstname: new FormControl("", [Validators.required, Validators.minLength(2), Validators.pattern("[a-zA-Z].*")]),
      lastname: new FormControl("", [Validators.required, Validators.minLength(2), Validators.pattern("[a-zA-Z].*")]),
      email: new FormControl("", [Validators.required, Validators.email]),
      mobile:new FormControl('',[Validators.required,Validators.minLength(10),Validators.maxLength(10)]),
      gender: new FormControl("", [Validators.required]),
      pwd: new FormControl("", [Validators.required, Validators.minLength(6), Validators.maxLength(15)]),
    });
  }

  hideShowPass() {

    this.isTextVisible = !this.isTextVisible;
    this.isTextVisible ? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash";
    this.isTextVisible ? this.type = "text" : this.type = "password";
  }

  get FirstName(): FormControl {
    return this.registerForm.get("firstname") as FormControl;
  }

  get LastName(): FormControl {
    return this.registerForm.get('lastname') as FormControl;
  }

  get Email(): FormControl {
    return this.registerForm.get('email') as FormControl;
  }

  get Mobile():FormControl{
    return this.registerForm.get('mobile') as FormControl;
  }

  get Gender(): FormControl {
    return this.registerForm.get('gender') as FormControl;
  }

  get PWD(): FormControl {
    return this.registerForm.get("pwd") as FormControl;
  }

  getFirstNameErrorMessage() {
    return this.registerForm.controls?.['firstname'].hasError('required') ? 'Enter First Name' : '';
  }

  getLastNameErrorMessage() {
    return this.registerForm.controls?.['lastname'].hasError('required') ? 'Enter Last Name' : '';
  }

  getEmailErrorMessage() {
    if (this.registerForm.controls?.['email'].hasError('required')) {
      return 'Enter Email';
    }
    return this.registerForm.controls?.['email'].hasError('email') ? 'Not a valid email' : '';
  }

  getMobileErrorMessage() {
    return this.registerForm.controls?.['mobile'].hasError('required') ? 'Enter Mobile' : '';
  }

  getGenderErrorMessage() {
    return this.registerForm.controls?.['gender'].hasError('required') ? 'Enter Gender' : '';
  }

  getPasswordErrorMessage() {
    return this.registerForm.controls?.['pwd'].hasError('required') ? 'Enter Password' : '';
  }

  registerSubmit() {
    this.authServ.createAccount([
      this.registerForm.value.firstname,
      this.registerForm.value.lastname,
      this.registerForm.value.email,
      this.registerForm.value.mobile,
      this.registerForm.value.gender,
      this.registerForm.value.pwd
    ]).subscribe(res => {
      if (res == 'Success') {
        this.isAccountCreated = true;
        this.displayMsg = 'Account Created Successfully!';
        this.router.navigate(["/login"]);
      } else if (res == 'Already Exists') {
        this.isAccountCreated = false;
        this.displayMsg = 'Account Already Exist.';
      } else {
        this.isAccountCreated = false;
        this.displayMsg = 'Something went wrong';
      }
    });
  }

  redirectToLogin() {
    this.router.navigate(["/login"]);
  }

}


