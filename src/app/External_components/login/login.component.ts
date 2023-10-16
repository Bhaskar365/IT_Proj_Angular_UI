import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { delay } from 'rxjs';
import ValidateForm from 'src/app/helpers/validateform';
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
  isUserValid: boolean = false;
  isDataLoading = true;

  constructor(private fb: FormBuilder,
    private loginAuth: ApiServiceService,
    private router: Router,
    private toastServ: NgToastService) { }

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

  loginSubmit() {
    this.loginAuth.loginUser([
      this.loginForm.value.email,
      this.loginForm.value.pwd
    ]
    ).subscribe(res => {
      if (res == 'Failure') 
      {
        
        this.isUserValid = false;
        this.responseMsg = 'Login Unsuccessful';
        Swal.fire({
          title: 'Authentication Unsuccessful',
          text: 'Error Logging In',
          icon: 'error',
          width:'800px',
          timer: 1500,
          timerProgressBar: true
        });
        setTimeout(()=>{
          this.isDataLoading = false;
          window.location.reload();
        },2000)
      }
      else {
        this.isUserValid = true;
        this.loginAuth.setToken(res);
        this.responseMsg = 'Login Successful';
        this.isDataLoading = false;
        Swal.fire({
          title: 'Authentication Successful',
          text: 'Login Successfully',
          icon: 'success',
          width:'800px',
          timer:1500,
          timerProgressBar:true,
      })
        this.router.navigateByUrl('admin/product-homepage');
      }
    });
  }

  // loginSubmit() {
  //   this.loginAuth.loginUser([
  //     this.loginForm.value.email,
  //     this.loginForm.value.pwd
  //   ]
  //   ).subscribe(res => {
  //     if (res == 'Failure') 
  //     {
  //       this.responseMsg = 'Login Unsuccessful';
  //       setTimeout(()=>{
  //         this.isDataLoading = false;
  //       },2000)
  //     }
  //     else {
  //       this.loginAuth.setToken(res);
  //       this.responseMsg = 'Login Successful';
  //       this.isDataLoading = false;
  //       // this.router.navigateByUrl('admin/product-homepage');
  //     }
  //   });
  // }
}
