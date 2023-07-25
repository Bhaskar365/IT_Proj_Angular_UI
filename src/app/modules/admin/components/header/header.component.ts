import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ApiServiceService } from 'src/app/services/api.service.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{
  
  name!:string;
  x:any;
  constructor(public api:ApiServiceService,private router:Router) {}

  jwtHelperService = new JwtHelperService();

  @Output() menuClicked = new EventEmitter<boolean>();
  showFiller = false;


  ngOnInit(): void {
    
    let token = localStorage.getItem('access_token');
    let userInfo = token != null ? this.jwtHelperService.decodeToken(token):null;
    let data =  userInfo;
    this.x = data;
  }

  logOut(){
    
    this.api.removeToken();
    this.router.navigateByUrl('/login');

  }

  homeRouter(){
    this.router.navigate(["admin/product-homepage"]);
  }

}
