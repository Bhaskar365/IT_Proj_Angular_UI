import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ApiServiceService } from 'src/app/services/api.service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  type: string = "password";
  isText: boolean = false;
  eyeIcon: string = "fa-eye-slash";
  responseMsg: any = '';
  loginForm!: FormGroup;
  failMsg: boolean = true;
  spinnerLoading: boolean = true;
  successMsg:boolean = true;

  constructor(private loginAuth: ApiServiceService,
    private router: Router) { }

  ngOnInit(): void {

    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      pwd: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  hideShowPass() {
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash";
    this.isText ? this.type = "text" : this.type = "password";
  }

  get Email(): FormControl {
    return this.loginForm.get('email') as FormControl;
  }

  get PWD(): FormControl {
    return this.loginForm.get('pwd') as FormControl;
  }

  loginSubmit() 
  {
    this.spinnerLoading = false;
    this.loginAuth.loginUser([
      this.loginForm.value.email,
      this.loginForm.value.pwd
    ]).subscribe(res => {
      this.failMsg = true;
      if (res == 'Failure') {
        this.responseMsg = 'Wrong Credentials. Try Again';
        this.failMsg = false;
        this.spinnerLoading = true;
      }
      else 
      {
        this.responseMsg = 'Login Successful';
        this.successMsg = true;
        this.loginAuth.setToken(res);
        this.successMsg = false;
        this.spinnerLoading = true;

        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 1300,
          timerProgressBar: true,
        })
        
        Toast.fire({
          icon: 'success',
          title: 'Signed in successfully'
        })

        setTimeout(()=>{
          this.spinnerLoading = false;
          this.router.navigateByUrl('admin/product-homepage');
        },1500)
      }

    });
  }

  getPasswordErrorMessage() {
    return this.loginForm.controls?.['pwd'].hasError('required') ? 'Enter Password' : '';
   }

  getEmailErrorMessage() {
    if (this.loginForm.controls?.['email'].hasError('required')) {
      return 'Enter Email';
   }
   return this.loginForm.controls?.['email'].hasError('email') ? 'Not a valid email' : '';
  }

  moveToRegister() {
    this.router.navigateByUrl('/sign-up');
  }
}
